using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class VendorRatingController : ControllerBase
{
    private readonly VendorRatingRepository _vendorRatingRepository;
    private readonly ARoleRepository _arolerepository;
    private readonly ProductRepository _productRepository;

    public VendorRatingController(VendorRatingRepository vendorRatingRepository, ARoleRepository arolerepository, ProductRepository productRepository)
    {
        _vendorRatingRepository = vendorRatingRepository;
        _arolerepository = arolerepository;
        _productRepository = productRepository;
    }

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

        // Validate ProductID
        if (string.IsNullOrEmpty(rating.ProductID))
        {
            return BadRequest("ProductID is required.");
        }

        // Validate rating (should be between 1 and 5)
        if (rating.Rating < 1 || rating.Rating > 5)
        {
            return BadRequest("Rating must be between 1 and 5.");
        }

        if (string.IsNullOrEmpty(rating.Comment))
        {
            return BadRequest("Comment is required.");
        }
        rating.Date = DateTime.Now;

        var vendor = _arolerepository.GetVendorById(rating.VendorID);
        if (vendor == null)
        {
            return NotFound(new { message = "Vendor with the given Id not found." });
        }
        var product = _productRepository.GetProductByID(rating.ProductID);
        if (product == null)
        {
            return NotFound(new { message = "Product Not Found" });
        }

        _vendorRatingRepository.AddRating(rating);
        return Ok("Rating and comment submitted.");
    }
    // Endpoint to get the rating summary for a given vendor
    [HttpGet("summary/{vendorId}")]
    public IActionResult GetVendorRatingSummary(string vendorId)
    {
        var vendor = _arolerepository.GetVendorById(vendorId);
        if (vendor == null)
        {
            return NotFound(new { message = "Vendor with the given Id not found." });
        }

        var (averageRating, totalRatings, comments) = _vendorRatingRepository.GetRatingSummaryByVendorId(vendorId);

        if (totalRatings == 0)
        {
            return NotFound(new { message = "No ratings found for this vendor." });
        }

        return Ok(new
        {
            AverageRating = averageRating,
            TotalRatings = totalRatings,
            Comments = comments.Select(c => new
            {
                c.CustomerEmail,
                c.Comment,
                c.Rating,
                c.Date
            })
        });
    }

    [HttpGet("summary/{vendorId}/{productId}")]
    public IActionResult GetVendorProductRatingSummary(string vendorId, string productId)
    {
        var vendor = _arolerepository.GetVendorById(vendorId);
        if (vendor == null)
        {
            return NotFound(new { message = "Vendor with the given Id not found." });
        }

        var product = _productRepository.GetProductByID(productId);
        if (product == null)
        {
            return NotFound(new { message = "Product with the given ID not found." });
        }

        var (averageRating, totalRatings, comments) = _vendorRatingRepository.GetRatingSummaryByVendorIdAndProductId(vendorId, productId);

        if (totalRatings == 0)
        {
            return NotFound(new { message = "No ratings found for this vendor and product." });
        }

        return Ok(new
        {
            AverageRating = averageRating,
            TotalRatings = totalRatings,
            Comments = comments.Select(c => new
            {
                c.CustomerEmail,
                c.Comment,
                c.Rating,
                c.Date
            })
        });
    }
}
