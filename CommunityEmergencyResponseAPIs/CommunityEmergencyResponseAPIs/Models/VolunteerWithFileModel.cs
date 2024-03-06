namespace CommunityEmergencyResponseAPIs.Models
{
    public class VolunteerWithFileModel
    {
        public string Name { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string PhoneNumber { get; set; } 
        public string Email { get; set; } 
        public IFormFile File { get; set; }
    }
}
