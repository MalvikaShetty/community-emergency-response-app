using System.ComponentModel.DataAnnotations;

namespace CommunityEmergencyResponseAPIs.Models
{
    public class Volunteer
    {
        [Key]
        public int VolunteerID { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string City { get; set; }

        [Required]
        [StringLength(10)]
        public string ZipCode { get; set; }

        [Required]
        [StringLength(20)]
        [Phone] 
        public string PhoneNumber { get; set; }

        [Required]
        public DateTime JoiningDate { get; set; }

        [Required]
        public bool IsActive { get; set; }

        // Navigation property for VolunteerFile
        public List<VolunteerFile>? VolunteerFiles { get; set; }
    }
}
