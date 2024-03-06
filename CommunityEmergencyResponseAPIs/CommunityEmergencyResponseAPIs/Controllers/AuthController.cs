using Microsoft.AspNetCore.Mvc;
using CommunityEmergencyResponseAPIs.Services;
using CommunityEmergencyResponseAPIs.Models;

namespace CommunityEmergencyResponseAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userService.AuthenticateAsync(model.Email, model.PasswordHash);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }


        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(User model)
        {
            // Check if the email is already registered
            var existingUser = await _userService.GetUserByEmailAsync(model.Email);
            if (existingUser != null)
                return BadRequest(new { message = "Email is already registered" });

            // Create the user
            var user = await _userService.CreateAsync(model.FirstName, model.LastName, model.Email, model.PasswordHash);

            if (user == null)
                return BadRequest(new { message = "Failed to create user" });

            return Ok(user);
        }
    }
}
