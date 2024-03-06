using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CommunityEmergencyResponseAPIs.Models
{
    public class VolunteerFile
    {
        [Key]
        public int VolunteerFileId { get; set; }

        [ForeignKey("Volunteer")]
        public int VolunteerId { get; set; }

        [Required]
        [StringLength(255)]
        public string FileName { get; set; }

        [Required]
        public byte[] FileData { get; set; }

        // Navigation property to the associated Volunteer
        public Volunteer Volunteer { get; set; }
    }
}
