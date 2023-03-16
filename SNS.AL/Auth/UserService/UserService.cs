using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SNS.AL.Auth.IAuthService;
using SNS_DLA.Models.DTO_s;
using SNS_DLA.Models.DTO_s.Response;

namespace SNS.AL.Auth.AuthService
{
    public class UserService : IUserService
    {
        private UserManager<IdentityUser> _userManager;

        public UserService(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<RegistrationResponse> RegisterUserAsync(RegistrationRequest request)
        {
            if (request == null)
            {
                throw new NullReferenceException("Request is null");
            }

            if (request.Password != request.ConfirmPassword)
            {
                return new RegistrationResponse
                {
                    Message = "Passwords must match",
                    IsSuccess = false,
                };
            }

            var identityUser = new IdentityUser
            {
                UserName = request.Username,
                Email = request.Email,
            };

            var result = await _userManager.CreateAsync(identityUser, request.Password);

            if (result.Succeeded)
            {
                return new RegistrationResponse
                {
                    Message = "User registration successful",
                    IsSuccess = true,
                };
            }

            return new RegistrationResponse
            {
                Message = "User registration failed",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description),
            };
        }
    }
}
