public interface ICategoryRepository
{
    IEnumerable<Category> GetAllVendors();
    
    Category GetCategoryByID(string id);

    void AddCategory(Category category);

    void UpdateCategory(Category category);
    
    void UpdateCategoryStatus(string id,bool val);

    string DeleteCategory(string id);
}
