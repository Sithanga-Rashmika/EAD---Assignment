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

        user.IsActive = false; // Account needs activation by CSR
        _userRepository.AddUser(user);
        return Ok("User registered successfully. Awaiting CSR activation.");
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

        user.IsActive = true;
        _userRepository.UpdateUser(user);
        return Ok("User activated successfully.");
    }

    // Modify user account details (e.g., change email or password)
    [HttpPut("modify")]
    public IActionResult ModifyUser([FromBody] User modifiedUser)
    {
        var existingUser = _userRepository.GetUserByEmail(modifiedUser.Email);
        if (existingUser == null)
        {
            return NotFound("User does not exist.");
        }

        if (!existingUser.IsActive)
        {
            return BadRequest("Account is inactive. Please contact CSR to activate it.");
        }

        existingUser.Password = modifiedUser.Password;
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

        user.IsActive = false;
        user.IsDeactivatedByCSR = true;
        _userRepository.UpdateUser(user);
        return Ok("User account deactivated successfully.");
    }

    // Reactivate a deactivated account by CSR or Administrator
    [HttpPost("reactivate")]
    public IActionResult ReactivateUser([FromQuery] string email)
    {
        var user = _userRepository.GetUserByEmail(email);
        if (user == null)
        {
            return NotFound("User does not exist.");
        }

        if (!user.IsDeactivatedByCSR)
        {
            return BadRequest("Account was not deactivated by CSR.");
        }

        user.IsActive = true;
        user.IsDeactivatedByCSR = false;
        _userRepository.UpdateUser(user);
        return Ok("User reactivated successfully.");
    }
}
