using System;
using System.Linq;
using System.Threading.Tasks;
using CommunityEmergencyResponseAPIs.Models;
using Microsoft.EntityFrameworkCore;

namespace CommunityEmergencyResponseAPIs.Services
{
    public interface IUserService
    {
        Task<User> AuthenticateAsync(string email, string password);
        Task<User> CreateAsync(string firstName, string lastName, string email, string password);
        Task<User> GetUserByEmailAsync(string email);
    }

    public class UserService : IUserService
    {
        private readonly EmergencyResponseDbContext _context;

        public UserService(EmergencyResponseDbContext context)
        {
            _context = context;
        }

        public async Task<User> AuthenticateAsync(string email, string password)
        {
            var user = await _context.user.SingleOrDefaultAsync(x => x.Email == email);

            // Check if user exists and password matches
            if (user == null || !VerifyPasswordHash(password, user.PasswordHash))
                return null;

            return user;
        }

        public async Task<User> CreateAsync(string firstName, string lastName, string email, string password)
        {
            // Check if email is already taken
            if (await _context.user.AnyAsync(x => x.Email == email))
                return null;

            // Create new user
            var user = new User
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                PasswordHash = CreatePasswordHash(password),
                Role = "User" // Set a default role, you may adjust this as needed
            };

            _context.user.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.user.SingleOrDefaultAsync(x => x.Email == email);
        }

        private string CreatePasswordHash(string password)
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt();

            // Hash the password using the salt
            string hash = BCrypt.Net.BCrypt.HashPassword(password, salt);

            return hash;
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }
    }
}
