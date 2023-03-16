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
                    Name = user.UserName,
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
    }
}
