using MongoDB.Driver;

public class CategoryRepository
{
    private readonly MongoDbContext _context;

    public CategoryRepository(MongoDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Category> GetAllCategory()
    {
        return _context.Categories.Find(_ => true).ToList(); // Retrieve all products
    }

    public Category GetCategoryByID(string id)
    {
        return _context.Categories.Find(category => category.CategoryID == id).FirstOrDefault();
    }

    public void AddCategory(Category category)
    {
        _context.Categories.InsertOne(category);
    }

    public void UpdateCategory(Category category)
    {
        var exCategory = GetCategoryByID(category.CategoryID);
        if (exCategory == null)
        {
            throw new Exception("Category not found.");
        }

        exCategory.CategoryName = category.CategoryName;
        exCategory.CategoryStatus = category.CategoryStatus;

        _context.Categories.ReplaceOne(c => c.CategoryID == category.CategoryID, exCategory);
    }

    // Delete a product by ID
    public void DeleteCategory(string id)
    {
        _context.Categories.DeleteOne(c => c.CategoryID == id);
    }

    public void UpdateCategoryStatus(string id, bool val)
    {
        var exCategory = GetCategoryByID(id);
        if (exCategory == null)
        {
            throw new Exception("Category not found.");
        }
        
        exCategory.CategoryStatus = val;
        _context.Categories.ReplaceOne(c => c.CategoryID == id, exCategory);
    }


}
