public interface IVendorRepository
{
    IEnumerable<Vendor> GetAllVendors();
    
    Vendor GetVendorByID(string id);

    void AddVendor(Product product);

    void UpdateVendor(Product product);

    string DeleteVendor(string id);
}
