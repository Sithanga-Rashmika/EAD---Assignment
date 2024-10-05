using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using BCrypt.Net;


[ApiController]
[Route("api/[controller]")]
public class VendorController : ControllerBase
{
    private readonly VendorRepository _vendorRepository;

    public VendorController(VendorRepository vendorRepository)
    {
        _vendorRepository = vendorRepository;
    }

    // GET: api/Product
    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAllVendors()
    {
        var vendors = _vendorRepository.GetAllVendors();
        return Ok(vendors);
    }

    // GET: api/Product/{id}
    [HttpGet("{id}")]
    public ActionResult<Vendor> GetVendorByID(string id)
    {
        var vendor = _vendorRepository.GetVendorByID(id);
        if (vendor == null)
        {
            return NotFound(); // Return 404 if vendor not found
        }
        return Ok(vendor);
    }

    // POST: api/Product
    [HttpPost]
    public IActionResult AddVendor([FromBody] Vendor vendor)
    {
        vendor.VendorPassword = BCrypt.Net.BCrypt.HashPassword(vendor.VendorPassword);

        // Add the vendor to the repository
        _vendorRepository.AddVendor(vendor);

        // Return the created vendor
        return CreatedAtAction(nameof(GetVendorByID), new { id = vendor.VendorID }, vendor);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateVendor(string id, [FromBody] Vendor vendor)
    {
        var exitingVendor = _vendorRepository.GetVendorByID(id);
        if (exitingVendor == null)
        {
            return NotFound(); // Return 404 if product not found
        }

        // Update the product with new values
        _vendorRepository.UpdateVendor(vendor);
        return NoContent(); // Return 204 No Content on successful update
    }

    // DELETE: api/Product/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteVendor(string id)
    {
        var vendor = _vendorRepository.GetVendorByID(id);
        if (vendor == null)
        {
            return NotFound(); // Return 404 if product not found
        }

        _vendorRepository.DeleteVendor(id);
        return NoContent(); // Return 204 No Content on successful deletion
    }

    [HttpPost("login")]
    public IActionResult VendorLogin([FromBody] Vendor loginRequest)
    {
        // Retrieve the vendor by email
        var vendor = _vendorRepository.GetVendorByEmail(loginRequest.VendorEmail);

        if (vendor == null)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }

        // Verify the entered password with the stored hashed password
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginRequest.VendorPassword, vendor.VendorPassword);

        if (!isPasswordValid)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }

        return Ok(new { message = "Login successful" });
    }
}
