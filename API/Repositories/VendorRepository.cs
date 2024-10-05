using MongoDB.Driver;

public class VendorRepository
{
    private readonly MongoDbContext _context;

    public VendorRepository(MongoDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Vendor> GetAllVendors()
    {
        return _context.Vendors.Find(_ => true).ToList(); // Retrieve all products
    }

    public Vendor GetVendorByID(string id)
    {
        return _context.Vendors.Find(vendor => vendor.VendorID == id).FirstOrDefault();
    }

    public void AddVendor(Vendor vendor)
    {
        _context.Vendors.InsertOne(vendor);
    }

    public void UpdateVendor(Vendor vendor)
    {
        var existingVendor = GetVendorByID(vendor.VendorID);
        if (existingVendor == null)
        {
            throw new Exception("Vendor not found.");
        }

        // Manually update the fields that need to be changed, ensuring _id remains the same
        existingVendor.VendorName = vendor.VendorName;
        existingVendor.VendorEmail = vendor.VendorEmail;
        existingVendor.VendorPassword = vendor.VendorPassword;
        existingVendor.Rateing = vendor.Rateing;

        // Replace the vendor while keeping the _id intact
        _context.Vendors.ReplaceOne(v => v.VendorID == vendor.VendorID, existingVendor);
    }

    // Delete a product by ID
    public void DeleteVendor(string id)
    {
        _context.Vendors.DeleteOne(v => v.VendorID == id);
    }

    public Vendor GetVendorByEmail(string email)
    {
        return _context.Vendors.Find(v => v.VendorEmail == email).FirstOrDefault();
    }
}
