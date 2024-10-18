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
    [HttpPost("activate/{email}")]
    public IActionResult ActivateUser([FromRoute] string email)
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
    [HttpPost("deactivate/{email}")]
    public IActionResult DeactivateUser([FromRoute] string email)
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

    [HttpGet("getUserDetails/{email}")]
    public IActionResult GetUserByEmail(string email)
    {
        var user = _userRepository.GetUserByEmail(email);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        return Ok(user);
    }

    [HttpPatch("update/{email}")]
    public IActionResult UpdateUserDetails(string email, [FromBody] UpdateUserDto updatedUser)
    {
        var existingUser = _userRepository.GetUserByEmail(email);
        if (existingUser == null)
        {
            return NotFound("User does not exist.");
        }

        // Only allow updates if the account is active
        if (existingUser.IsActive != "Active")
        {
            return BadRequest("Account is inactive. Please contact CSR to activate it.");
        }

        // Update only fields that are provided (not null)
        if (!string.IsNullOrEmpty(updatedUser.Password))
        {
            updatedUser.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);
            existingUser.Password = updatedUser.Password;
        }
        if (!string.IsNullOrEmpty(updatedUser.Contact))
        {
            existingUser.Contact = updatedUser.Contact;
        }
        if (!string.IsNullOrEmpty(updatedUser.Name))
        {
            existingUser.Name = updatedUser.Name;
        }
        if (!string.IsNullOrEmpty(updatedUser.Address))
        {
            existingUser.Address = updatedUser.Address;
        }
        if (!string.IsNullOrEmpty(updatedUser.Gender))
        {
            existingUser.Gender = updatedUser.Gender;
        }
        if (!string.IsNullOrEmpty(updatedUser.IsActive))
        {
            existingUser.IsActive = updatedUser.IsActive;
        }

        _userRepository.UpdateUser(existingUser);
        return Ok("User details updated successfully.");
    }


}
