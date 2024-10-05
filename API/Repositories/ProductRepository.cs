using MongoDB.Driver;

public class ProductRepository
{
    private readonly MongoDbContext _context;

    public ProductRepository(MongoDbContext context)
    {
        _context = context;
    }

    public Product GetProductByID(string id)
    {
        return _context.Products.Find(product => product.ProductID == id).FirstOrDefault();
    }

    public void AddProduct(Product product)
    {
        _context.Products.InsertOne(product);
    }
    public void UpdateProduct(Product updatedProduct)
    {
        var existingProduct = GetProductByID(updatedProduct.ProductID);
        if (existingProduct == null)
        {
            throw new Exception("Product not found.");
        }

        var update = Builders<Product>.Update
            .Set(p => p.Name, updatedProduct.Name)
            .Set(p => p.VendorID, updatedProduct.VendorID)
            .Set(p => p.Description, updatedProduct.Description)
            .Set(p => p.Category, updatedProduct.Category)
            .Set(p => p.Price, updatedProduct.Price)
            .Set(p => p.StockQuantity, updatedProduct.StockQuantity)
            .Set(p => p.ImageUrl, updatedProduct.ImageUrl);
        // Add other fields to update as necessary

        _context.Products.UpdateOne(p => p.ProductID == updatedProduct.ProductID, update);
    }
    public IEnumerable<Product> GetAllProducts()
    {
        return _context.Products.Find(_ => true).ToList();
    }

    public void DeleteProduct(string id)
    {
        _context.Products.DeleteOne(p => p.ProductID == id);
    }

    public IEnumerable<Product> BrowseProducts(string category, string searchTerm)
    {
        // Search by category or product name
        return _context.Products
                       .Find(p => p.Category == category || p.Name.Contains(searchTerm))
                       .ToList();
    }
}
