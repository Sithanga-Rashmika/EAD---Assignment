using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using BCrypt.Net;


[ApiController]
[Route("api/[controller]")]
public class ARoleController : ControllerBase
{
    private readonly ARoleRepository _arolerepository;

    public ARoleController(ARoleRepository aRoleRepository)
    {
        _arolerepository = aRoleRepository;
    }

    // GET: api/Product
    [HttpGet]
    public ActionResult<IEnumerable<ARole>> GetAllARoles()
    {
        var aRoles = _arolerepository.GetAllARoles();
        return Ok(aRoles);
    }

    // GET: api/Product/{id}
    [HttpGet("{id}")]
    public ActionResult<ARole> GetARoleByID(string id)
    {
        var aRole = _arolerepository.GetARoleByID(id);
        if (aRole == null)
        {
            return NotFound(); // Return 404 if aRole not found
        }
        return Ok(aRole);
    }

    // POST: api/Product
    [HttpPost]
    public IActionResult AddARole([FromBody] ARole aRole)
    {
        aRole.ARolePasswrod = BCrypt.Net.BCrypt.HashPassword(aRole.ARolePasswrod);

        // Add the vendor to the repository
        _arolerepository.AddARole(aRole);

        // Return the created vendor
        return CreatedAtAction(nameof(GetARoleByID), new { id = aRole.ARoleID }, aRole);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateVendor(string id, [FromBody] ARole aRole)
    {
        var exarole = _arolerepository.GetARoleByID(id);
        if (exarole == null)
        {
            return NotFound(); // Return 404 if product not found
        }

        // Update the product with new values
        _arolerepository.UpdateARole(aRole);
        return NoContent(); // Return 204 No Content on successful update
    }

    // DELETE: api/Product/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteVendor(string id)
    {
        var aRole = _arolerepository.GetARoleByID(id);
        if (aRole == null)
        {
            return NotFound(); // Return 404 if product not found
        }

        _arolerepository.DeleteARole(id);
        return NoContent(); // Return 204 No Content on successful deletion
    }

    [HttpPost("login")]
    public IActionResult AROleLogin([FromBody] ARole loginRequest)
    {
        // Retrieve the vendor by email
        var aRole = _arolerepository.GetARoleByEmail(loginRequest.ARoleEmail);

        if (aRole == null)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }

        // Verify the entered password with the stored hashed password
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginRequest.ARolePasswrod, aRole.ARolePasswrod);

        if (!isPasswordValid)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }

        return Ok(aRole);
    }
}
