using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserRepository _userRepository;

    public UserController(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] User user)
    {
        var existingUser = _userRepository.GetUserByEmail(user.Email);
        if (existingUser != null)
        {
            return BadRequest("User already exists");
        }

        user.IsActive = false; // Account needs activation by CSR
        _userRepository.AddUser(user);
        return Ok("User registered successfully. Awaiting CSR activation.");
    }

    [HttpPost("activate")]
    public IActionResult ActivateUser([FromQuery] string email)
    {
        var user = _userRepository.GetUserByEmail(email);
        if (user == null)
        {
            return NotFound();
        }

        user.IsActive = true;
        _userRepository.UpdateUser(user);
        return Ok("User activated successfully.");
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var user = _userRepository.GetUserByEmail(request.Email);
        if (user == null)
        {
            return Unauthorized("User does not exist.");
        }

        // Validate the password (in production, use hashed passwords)
        if (user.Password != request.Password)
        {
            return Unauthorized("Incorrect password.");
        }

        if (!user.IsActive)
        {
            return Unauthorized("Account is not activated.");
        }

        // Login successful, return a success message or a token (e.g., JWT) if using authentication
        return Ok("Login successful.");
    }
}
