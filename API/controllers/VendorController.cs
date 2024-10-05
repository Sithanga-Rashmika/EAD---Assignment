using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class VendorController : ControllerBase
{
    private readonly VendorRatingRepository _vendorRatingRepository;

    public VendorController(VendorRatingRepository vendorRatingRepository)
    {
        _vendorRatingRepository = vendorRatingRepository;
    }

    // Rank and comment on vendor
    [HttpPost("rank")]
    public IActionResult RankVendor([FromBody] VendorRating rating)
    {
        rating.Date = DateTime.Now;
        _vendorRatingRepository.AddRating(rating);
        return Ok("Rating and comment submitted.");
    }
}
