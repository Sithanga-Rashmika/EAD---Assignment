using MongoDB.Driver;

public class ARoleRepository
{
    private readonly MongoDbContext _context;

    public ARoleRepository(MongoDbContext context)
    {
        _context = context;
    }

    public IEnumerable<ARole> GetAllARoles()
    {
        return _context.Aroles.Find(_ => true).ToList(); // Retrieve all products
    }

    public ARole GetARoleByID(string id)
    {
        return _context.Aroles.Find(arole => arole.ARoleID == id).FirstOrDefault();
    }

    public void AddARole(ARole aRole)
    {
        _context.Aroles.InsertOne(aRole);
    }

    public void UpdateARole(ARole aRole)
    {
        var exarole = GetARoleByID(aRole.ARoleID);
        if (exarole == null)
        {
            throw new Exception("Admin Role not found.");
        }

        // Manually update the fields that need to be changed, ensuring _id remains the same
        exarole.ARoleEmail = aRole.ARoleEmail;
        // Hash the password if it has changed chnaged by sithanga 
        if (!string.IsNullOrEmpty(aRole.ARolePasswrod) && aRole.ARolePasswrod != exarole.ARolePasswrod)
        {
            exarole.ARolePasswrod = BCrypt.Net.BCrypt.HashPassword(aRole.ARolePasswrod);
        }
        exarole.ARoleTyoe = aRole.ARoleTyoe;
        exarole.ARName = aRole.ARName;
        exarole.ARNumber = aRole.ARNumber;

        // Replace the vendor while keeping the _id intact
        _context.Aroles.ReplaceOne(a => a.ARoleID == aRole.ARoleID, exarole);
    }

    // Delete a product by ID
    public void DeleteARole(string id)
    {
        _context.Aroles.DeleteOne(a => a.ARoleID == id);
    }

    public ARole GetARoleByEmail(string email)
    {
        return _context.Aroles.Find(a => a.ARoleEmail == email).FirstOrDefault();
    }

    public List<ARole> GetARolesByRole(string role)
    {
        return _context.Aroles.Find(a => a.ARoleTyoe == role).ToList();
    }

    public ARole GetVendorById(string vendorId)
    {
        return _context.Aroles.Find(a => a.ARoleID == vendorId && a.ARoleTyoe == "Vendor").FirstOrDefault();
    }

}
