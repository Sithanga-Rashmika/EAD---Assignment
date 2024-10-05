public interface IProductRepository
{
    IEnumerable<Product> GetAllProducts();
    
    Product GetProductByID(string id);

    void AddProduct(Product product);

    void UpdateProduct(Product product);

    string DeleteProduct(string id);
}
