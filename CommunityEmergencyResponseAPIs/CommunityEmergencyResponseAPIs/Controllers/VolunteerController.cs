using CommunityEmergencyResponseAPIs.Models;
using CommunityEmergencyResponseAPIs.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CommunityEmergencyResponseAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteerController : ControllerBase
    {
        private readonly EmergencyResponseDbContext _context;
        private readonly IUserService _userService;

        public VolunteerController(EmergencyResponseDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        // GET: api/Volunteer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Volunteer>>> GetVolunteers()
        {
            return await _context.volunteer.Where(v => v.IsActive).ToListAsync();
        }

        // POST: api/Volunteer/addvolunteer
        [HttpPost("addvolunteer")]
        public async Task<IActionResult> PostVolunteer([FromForm] VolunteerWithFileModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the phone number already exists and IsActive is true
            bool phoneNumberExistsAndIsActiveTrue = await _context.volunteer.AnyAsync(v => v.PhoneNumber == model.PhoneNumber && v.IsActive);
            bool phoneNumberExistsAndIsActiveFalse = await _context.volunteer.AnyAsync(v => v.PhoneNumber == model.PhoneNumber && v.IsActive == false);

            if (phoneNumberExistsAndIsActiveTrue)
            {
                // Return a message indicating the phone number already exists
                return BadRequest(new { Message = "Phone number already exists. Please use a different number." });
            }
            else if(phoneNumberExistsAndIsActiveFalse)
            {
                var existingVolunteer = await _context.volunteer.FirstOrDefaultAsync(v => v.PhoneNumber == model.PhoneNumber);
                if (existingVolunteer != null)
                {
                    existingVolunteer.IsActive = true;
                    existingVolunteer.JoiningDate = DateTime.UtcNow;
                    await _context.SaveChangesAsync();
                }
                var use = await _userService.GetUserByEmailAsync(model.Email);
                if (use != null)
                {
                    use.Role = "Volunteer";
                    await _context.SaveChangesAsync();
                }


                // Return success message
                return Ok(new { Message = "Volunteer reactivated successfully." });
            }

            // Creating new volunteer
            var volunteer = new Volunteer
            {
                Name = model.Name,
                City = model.City,
                PhoneNumber = model.PhoneNumber,
                ZipCode = model.ZipCode,
                JoiningDate = DateTime.UtcNow,
                IsActive = true // Assuming all new volunteers are active by default
            };

            // Adding volunteer to database
            _context.volunteer.Add(volunteer);
            await _context.SaveChangesAsync();

            if (model.File != null)
            {
                // Read the file into a byte array
                byte[] fileData;
                using (var stream = new MemoryStream())
                {
                    await model.File.CopyToAsync(stream);
                    fileData = stream.ToArray();
                }

                var volunteerFile = new VolunteerFile
                {
                    VolunteerId = volunteer.VolunteerID,
                    FileName = model.File.FileName,
                    FileData = fileData
                };

                _context.volunteerfile.Add(volunteerFile);
                await _context.SaveChangesAsync();
            }

            // After saving the new volunteer to the database, update the user's role to "Volunteer"
            var user = await _userService.GetUserByEmailAsync(model.Email);
            if (user != null)
            {
                user.Role = "Volunteer";
                await _context.SaveChangesAsync();
            }

            return Ok(new { Message = "Volunteer created successfully. Please refetch the volunteer list." });
        }

        [HttpGet("getrole/{email}")]
        public async Task<ActionResult<User>> GetRole(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user != null && user.Role == "Volunteer")
            {
                return Ok(true);
            }
            return Ok(false);
        }

        // GET: api/Volunteer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Volunteer>> GetVolunteerById(int id)
        {
            var volunteer = await _context.volunteer.FindAsync(id);

            if (volunteer == null)
            {
                return NotFound();
            }

            return volunteer;
        }

        // GET: api/Volunteer/downloadFile/{volunteerId}
        [HttpGet("downloadFile/{volunteerId}")]
        public async Task<IActionResult> DownloadFile(int volunteerId)
        {
            // Assuming you want to download the latest file associated with the volunteer
            var volunteerFile = await _context.volunteerfile
                .Where(vf => vf.VolunteerId == volunteerId)
                .OrderByDescending(vf => vf.VolunteerFileId) // Assuming VolunteerFileId is an incremental identifier
                .FirstOrDefaultAsync();

            if (volunteerFile == null)
            {
                return NotFound();
            }

            return File(volunteerFile.FileData, "application/octet-stream", volunteerFile.FileName);
        }

        [HttpPost("removevolunteer")]
        public async Task<IActionResult> RemoveVolunteer([FromBody] RemoveVolunteerRequest request)
        {
            var user = await _userService.GetUserByEmailAsync(request.Email);
            if (user != null)
            {
                user.Role = "User";
                await _context.SaveChangesAsync();
            }

            var vol = await _context.volunteer.FirstOrDefaultAsync(v => v.PhoneNumber == request.PhoneNumber);
            if (vol != null)
            {
                vol.IsActive = false;
                await _context.SaveChangesAsync();
            }

            return Ok(new { Message = "Volunteer removed successfully" });
        }

        public class RemoveVolunteerRequest
        {
            public string Email { get; set; }
            public string PhoneNumber { get; set; }
        }
    }
}
