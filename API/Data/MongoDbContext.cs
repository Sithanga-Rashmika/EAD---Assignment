using MongoDB.Driver;
using Microsoft.Extensions.Options;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IOptions<MongoDbSettings> settings)
    {
        if (string.IsNullOrWhiteSpace(settings.Value.ConnectionString))
            throw new ArgumentNullException(nameof(settings.Value.ConnectionString), "Connection string cannot be null or empty.");
        if (string.IsNullOrWhiteSpace(settings.Value.DatabaseName))
            throw new ArgumentNullException(nameof(settings.Value.DatabaseName), "Database name cannot be null or empty.");

        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoCollection<User> Users => _database.GetCollection<User>("users");
    public IMongoCollection<Product> Products => _database.GetCollection<Product>("products");
    public IMongoCollection<ARole> Aroles => _database.GetCollection<ARole>("aroles");
    public IMongoCollection<Category> Categories => _database.GetCollection<Category>("Categories");
}
