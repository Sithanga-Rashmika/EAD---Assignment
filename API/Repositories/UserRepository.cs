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
    public List<User> GetUsersByStatus(string status)
    {
        return _context.Users.Find(user => user.IsActive == status).ToList();
    }

    public void UpdateUserFields(string email, User updatedUser)
    {
        var updateDefinition = Builders<User>.Update.Set(u => u.Email, updatedUser.Email);

        if (!string.IsNullOrEmpty(updatedUser.Password))
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);
            updateDefinition = updateDefinition.Set(u => u.Password, hashedPassword);
        }

        if (!string.IsNullOrEmpty(updatedUser.Contact))
        {
            updateDefinition = updateDefinition.Set(u => u.Contact, updatedUser.Contact);
        }

        if (!string.IsNullOrEmpty(updatedUser.Name))
        {
            updateDefinition = updateDefinition.Set(u => u.Name, updatedUser.Name);
        }

        if (!string.IsNullOrEmpty(updatedUser.Address))
        {
            updateDefinition = updateDefinition.Set(u => u.Address, updatedUser.Address);
        }

        if (!string.IsNullOrEmpty(updatedUser.Gender))
        {
            updateDefinition = updateDefinition.Set(u => u.Gender, updatedUser.Gender);
        }

        if (!string.IsNullOrEmpty(updatedUser.IsActive))
        {
            updateDefinition = updateDefinition.Set(u => u.IsActive, updatedUser.IsActive);
        }

        _context.Users.UpdateOne(user => user.Email == email, updateDefinition);
    }


}
