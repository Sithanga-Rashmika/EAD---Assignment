using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class VendorRatingController : ControllerBase
{
    private readonly VendorRatingRepository _vendorRatingRepository;

    public VendorRatingController(VendorRatingRepository vendorRatingRepository)
    {
        _vendorRatingRepository = vendorRatingRepository;
    }

    // Rank and comment on vendor
    [HttpPost("rank")]
    public IActionResult RankVendor([FromBody] VendorRating rating)
    {
        // Validate vendor_id
        if (string.IsNullOrEmpty(rating.VendorID))
        {
            return BadRequest("Vendor ID is required.");
        }

        // Validate customer_id
        if (string.IsNullOrEmpty(rating.CustomerEmail))
        {
            return BadRequest("Customer Email is required.");
        }

        // Validate rating (should be between 1 and 5)
        if (rating.Rating < 1 || rating.Rating > 5)
        {
            return BadRequest("Rating must be between 1 and 5.");
        }

        // Validate comment (ensure it's not empty)
        if (string.IsNullOrEmpty(rating.Comment))
        {
            return BadRequest("Comment is required.");
        }

        // Set the current date and time for the rating
        rating.Date = DateTime.Now;

        // Add the rating to the repository
        _vendorRatingRepository.AddRating(rating);

        return Ok("Rating and comment submitted.");
    }
}
