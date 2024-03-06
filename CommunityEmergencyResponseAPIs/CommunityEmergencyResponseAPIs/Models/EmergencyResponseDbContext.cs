using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System;
using Microsoft.EntityFrameworkCore;
using CommunityEmergencyResponseAPIs.Models;

namespace CommunityEmergencyResponseAPIs.Models
{
    public class EmergencyResponseDbContext : DbContext
    {
        public EmergencyResponseDbContext(DbContextOptions<EmergencyResponseDbContext> options) : base(options)
        {

        }

        public DbSet<User> user { get; set; }
        public DbSet<Volunteer> volunteer { get; set; }
        public DbSet<VolunteerFile> volunteerfile { get; set; }
    }
}

