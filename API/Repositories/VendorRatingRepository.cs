using MongoDB.Driver;

public class VendorRatingRepository
{
    private readonly MongoDbContext _context;

    public VendorRatingRepository(MongoDbContext context)
    {
        _context = context;
    }

    public void AddRating(VendorRating rating)
    {
        _context.VendorRatings.InsertOne(rating);
    }
}
