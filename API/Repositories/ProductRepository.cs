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

    public IEnumerable<Product> GetProductByVendorID(string id)
    {
        var filter = Builders<Product>.Filter.And(
        Builders<Product>.Filter.Eq(p => p.VendorID, id),
        Builders<Product>.Filter.Lt(p => p.StockQuantity, 20));
        return _context.Products.Find(filter).ToList();
    }

    public IEnumerable<Product> GetVendorProductByID(string id)
    {
        var filter = Builders<Product>.Filter.And(
        Builders<Product>.Filter.Eq(p => p.VendorID, id));
        return _context.Products.Find(filter).ToList();
    }

    public void ProductTopup(string id, int val)
    {
        var existingProduct = GetProductByID(id);
        if (existingProduct == null)
        {
            throw new Exception("Product not found.");
        }

        var newQ = val + existingProduct.StockQuantity;

        var update = Builders<Product>.Update
            .Set(p => p.StockQuantity, newQ);

        _context.Products.UpdateOne(p => p.ProductID == id, update);
    }

    //created by sithanga 
    public void ProductRemove(string id, int val)
{
    var existingProduct = GetProductByID(id);
    if (existingProduct == null)
    {
        throw new Exception("Product not found.");
    }

    // Ensure stock does not go below zero
    var newQ = existingProduct.StockQuantity - val;
    if (newQ < 0)
    {
        throw new Exception("Insufficient stock to remove.");
    }

    var update = Builders<Product>.Update
        .Set(p => p.StockQuantity, newQ);

    _context.Products.UpdateOne(p => p.ProductID == id, update);
}

//this is not worked properly fetch only 1 item so i edit not its working properly do not change
    public IEnumerable<Product> GetCategoryProducts(string name)
    {
        var filter = Builders<Product>.Filter.And(
         Builders<Product>.Filter.Eq(p => p.Category, name));
        return _context.Products.Find(filter).ToList(); ;
    }
}
