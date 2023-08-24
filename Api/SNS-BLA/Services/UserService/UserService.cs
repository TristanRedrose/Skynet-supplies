using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SNS_BLA.Services.UserService
{
    public class UserService : IUserService
    {
        private UserManager<User> _userManager;
        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userManager.Users.ToListAsync();
        }

        public async Task<IEnumerable<UserResponse>> GetUsersByRole(string role)
        {
            List<UserResponse> usersResponse = new List<UserResponse>();

            var usersWithClaim = _userManager.GetUsersForClaimAsync(new Claim(ClaimTypes.Role, $"{role}")).Result;

            foreach (User user in usersWithClaim) 
            {
                var userData = new UserResponse
                {
                    Id = user.Id,
                    Name = user.Name,
                    Surname = user.Surname,
                    Email = user.Email,
                };
                
                usersResponse.Add(userData);
            }

            return usersResponse;
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
                
            if (user != null)
            {
                await _userManager.DeleteAsync(user);
                return true;
            }

            return false;
        }

        public async Task<UserDetails> GetUserByIdAsync(string id)
        {
            var user = await _userManager.Users
                .Where(x => x.Id == id)
                .Include(u => u.ContactInfo)
                .FirstAsync();

            UserDetails userDetails = new UserDetails
            {
                Id = user.Id,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                Phone = user.PhoneNumber,
                City = user.ContactInfo.City,
                Country = user.ContactInfo.Country,
                Street = user.ContactInfo.StreetAddress,
                PostCode = user.ContactInfo.PostCode,
            };

            return userDetails;
        }

        public async Task<bool> UpdateUserAsync(UserDetails userData)
        {
            try
            {
                var user = await _userManager.Users
                .Where(u => u.Id == userData.Id)
                .Include(u => u.ContactInfo)
                .FirstOrDefaultAsync();

                if (user == null)
                {
                    return false;
                }

                user.Name = userData.Name;
                user.Surname = userData.Surname;
                user.PhoneNumber = userData.Phone;
                user.Email = userData.Email;
                user.ContactInfo.Country = userData.Country;
                user.ContactInfo.City = userData.City;
                user.ContactInfo.StreetAddress = userData.Street;
                user.ContactInfo.PostCode = userData.PostCode;

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
    }
}
