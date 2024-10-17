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

    public (double AverageRating, int TotalRatings, List<VendorRating> Comments) GetRatingSummaryByVendorId(string vendorId)
    {
        // Retrieve all ratings for the given vendor
        var ratings = _context.VendorRatings.Find(r => r.VendorID == vendorId).ToList();

        if (!ratings.Any())
        {
            return (0, 0, new List<VendorRating>()); // No ratings found, return 0 average and empty list
        }

        // Calculate average rating
        double averageRating = ratings.Average(r => r.Rating);
        int totalRatings = ratings.Count;

        // Return the average rating, total number of ratings, and the comments
        return (averageRating, totalRatings, ratings);
    }

    public (double AverageRating, int TotalRatings, List<VendorRating> Comments) GetRatingSummaryByVendorIdAndProductId(string vendorId, string productId)
    {
        // Retrieve all ratings for the given vendor and product
        var ratings = _context.VendorRatings.Find(r => r.VendorID == vendorId && r.ProductID == productId).ToList();

        if (!ratings.Any())
        {
            return (0, 0, new List<VendorRating>()); // No ratings found, return 0 average and empty list
        }

        // Calculate average rating
        double averageRating = ratings.Average(r => r.Rating);
        int totalRatings = ratings.Count;

        // Return the average rating, total number of ratings, and the comments
        return (averageRating, totalRatings, ratings);
    }
}
