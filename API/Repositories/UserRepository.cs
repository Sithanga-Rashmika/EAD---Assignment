using MongoDB.Driver;

public class UserRepository
{
    private readonly MongoDbContext _context;

    public UserRepository(MongoDbContext context)
    {
        _context = context;
    }

    public User GetUserByEmail(string email)
    {
        return _context.Users.Find(user => user.Email == email).FirstOrDefault();
    }

    public void AddUser(User user)
    {
        _context.Users.InsertOne(user);
    }

    public void UpdateUser(User user)
    {
        _context.Users.ReplaceOne(u => u.Email == user.Email, user);
    }
}
