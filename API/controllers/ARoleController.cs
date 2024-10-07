using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;


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
    public IActionResult AROleLogin([FromBody] Dictionary<string, string> loginData)
    {
        // Retrieve the email and password from the dictionary
        if (!loginData.TryGetValue("ARoleEmail", out string ARoleEmail) ||
            !loginData.TryGetValue("ARolePasswrod", out string ARolePasswrod))
        {
            return BadRequest(new { message = "Email or password is missing" });
        }

        // Retrieve the role by email
        var aRole = _arolerepository.GetARoleByEmail(ARoleEmail);

        if (aRole == null)
        {
            return Unauthorized(new { message = "Invalid email" });
        }

        // Verify the entered password with the stored hashed password
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(ARolePasswrod, aRole.ARolePasswrod);

        if (!isPasswordValid)
        {
            return Unauthorized(new { message = "Password Missmatching" });
        }

        // Generate JWT token
        var token = GenerateJwtToken(aRole);

        // Return the JWT token and ARole information
        return Ok(new { token, aRole });
    }

    // Method to generate the JWT token
    private string GenerateJwtToken(ARole aRole)
    {
        // Key to sign the token (You should store this key in configuration or environment variables)
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("fasfafffsf786sf7afsgfasf7atfafggy"));

        // Create the claims for the token (you can add more claims as needed)
        var claims = new[]
        {
        new Claim(ClaimTypes.Email, aRole.ARoleEmail),
        new Claim(ClaimTypes.Role, aRole.ARoleTyoe) // Example claim, customize as needed
    };

        // Create the token descriptor
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
        };

        // Generate the token
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        // Return the serialized token
        return tokenHandler.WriteToken(token);
    }

    [HttpGet("role/{role}")]
    public IActionResult GetARolesByRole(string role)
    {
        var roles = _arolerepository.GetARolesByRole(role);
        if (roles == null || roles.Count == 0)
        {
            return NotFound(new { message = $"No roles found for the role: {role}" });
        }
        return Ok(roles);
    }
}
