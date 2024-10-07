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

    // Register a new user
    [HttpPost("register")]
    public IActionResult Register([FromBody] User user)
    {
        var existingUser = _userRepository.GetUserByEmail(user.Email);
        if (existingUser != null)
        {
            return BadRequest("User already exists.");
        }

        user.IsActive = "Pending";
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _userRepository.AddUser(user);
        return Ok("User registered successfully. Awaiting CSR activation.");
    }
    [HttpGet("status/{status}")]
    public IActionResult GetUsersByStatus(string status)
    {
        var users = _userRepository.GetUsersByStatus(status);
        if (users == null || users.Count == 0)
        {
            return NotFound($"No users found with status '{status}'.");
        }
        return Ok(users);
    }


    // Activate user account by CSR or Administrator
    [HttpPost("activate")]
    public IActionResult ActivateUser([FromQuery] string email)
    {
        var user = _userRepository.GetUserByEmail(email);
        if (user == null)
        {
            return NotFound("User does not exist.");
        }

        user.IsActive = "Active";
        _userRepository.UpdateUser(user);
        return Ok("User activated successfully.");
    }

    // Modify user account details (e.g., change email or password)
    [HttpPatch("modify")]
    public IActionResult ModifyUser([FromBody] User modifiedUser)
    {
        var existingUser = _userRepository.GetUserByEmail(modifiedUser.Email);
        if (existingUser == null)
        {
            return NotFound("User does not exist.");
        }

        if (existingUser.IsActive != "Active")
        {
            return BadRequest("Account is inactive. Please contact CSR to activate it.");
        }

        // Update only fields that are provided (not null or default)
        if (!string.IsNullOrEmpty(modifiedUser.Password))
        {
            modifiedUser.Password = BCrypt.Net.BCrypt.HashPassword(modifiedUser.Password);
        }
        existingUser.Password = modifiedUser.Password ?? existingUser.Password;
        existingUser.Contact = modifiedUser.Contact ?? existingUser.Contact;
        existingUser.Name = modifiedUser.Name ?? existingUser.Name;
        existingUser.Address = modifiedUser.Address ?? existingUser.Address;
        existingUser.Gender = modifiedUser.Gender ?? existingUser.Gender;

        _userRepository.UpdateUser(existingUser);
        return Ok("User details updated successfully.");
    }

    // Deactivate user account (customer can deactivate their own account)
    [HttpPost("deactivate")]
    public IActionResult DeactivateUser([FromQuery] string email)
    {
        var user = _userRepository.GetUserByEmail(email);
        if (user == null)
        {
            return NotFound("User does not exist.");
        }

        user.IsActive = "Deactivated";
        _userRepository.UpdateUser(user);
        return Ok("User account deactivated successfully.");
    }

    // Reactivate a deactivated account by CSR or Administrator
    // [HttpPost("reactivate")]
    // public IActionResult ReactivateUser([FromQuery] string email)
    // {
    //     var user = _userRepository.GetUserByEmail(email);
    //     if (user == null)
    //     {
    //         return NotFound("User does not exist.");
    //     }

    //     if (!user.IsDeactivatedByCSR)
    //     {
    //         return BadRequest("Account was not deactivated by CSR.");
    //     }

    //     user.IsActive = true;
    //     user.IsDeactivatedByCSR = false;
    //     _userRepository.UpdateUser(user);
    //     return Ok("User reactivated successfully.");
    // }

    [HttpPost("login")]
    public IActionResult Login([FromBody] Dictionary<string, string> loginData)
    {
        // Check if the email exists in the database

        if (!loginData.TryGetValue("email", out string email) ||
            !loginData.TryGetValue("password", out string password))
        {
            return BadRequest(new { message = "Email or password is missing" });
        }
        var existingUser = _userRepository.GetUserByEmail(email);
        Console.WriteLine("ccc");
        if (existingUser == null)
        {
            return NotFound("User does not exist.");
        }

        // Verify if the account is active
        if (existingUser.IsActive != "Active")
        {
            return BadRequest("Account is inactive. Please contact CSR to activate it.");
        }

        // Verify the password using BCrypt
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, existingUser.Password);
        if (!isPasswordValid)
        {
            return Unauthorized("Invalid password.");
        }

        // Login successful, return a success message or a token (e.g., JWT)
        return Ok("Login successful.");

    }
}
