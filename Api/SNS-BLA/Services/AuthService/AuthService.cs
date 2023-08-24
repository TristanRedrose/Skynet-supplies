using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SNS_DLA.Models.DTO_s;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SNS_BLA.Services.UserService
{
    public class AuthService : IAuthService
    {
        private UserManager<User> _userManager;
        private IConfiguration _configuration;

        public AuthService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<UserManagerResponse> RegisterUserAsync(UserRegistrationRequest request, string claimName)
        {
            if (request == null)
            {
                throw new NullReferenceException("Request is null");
            }

            if (request.Password != request.PassConfirm)
            {
                return new UserManagerResponse
                {
                    ErrorResponse = new ErrorResponse
                    {
                        Message = "Passwords must match",
                    },
                    IsSuccess = false,
                };
            }

            var userContactInfo = new ContactInfo
            {
                Country = request.Country,
                City = request.City,
                StreetAddress = request.Street,
                PostCode = request.PostCode,
            };

            var identityUser = new User
            {
                Name = request.Name,
                Surname = request.Surname,
                UserName = request.Email,
                Email = request.Email,
                PhoneNumber = request.Phone,
                ContactInfo = userContactInfo,
            };

            var result = await _userManager.CreateAsync(identityUser, request.Password);

            var claim = new Claim(ClaimTypes.Role, claimName);
            await _userManager.AddClaimAsync(identityUser, claim);

            if (result.Succeeded)
            {
                var tokenResponse = GenerateToken(identityUser);
                return new UserManagerResponse
                {
                    IsSuccess = true,
                    LoginResponse = new LoginResponse
                    {
                        Token = tokenResponse.TokenAsString,
                        ExpireDate = tokenResponse.Token.ValidTo,
                        Username = identityUser.UserName,
                        Role = claim.Value,
                    }
                };
            }

            return new UserManagerResponse
            {
                IsSuccess = false,
                ErrorResponse = new ErrorResponse
                {
                    Message = "User registration failed",
                    Errors = result.Errors.Select(e => e.Description),
                }
            };
        }

        public async Task<UserManagerResponse> RegisterAdminAsync(AdminRegistrationRequest request)
        {
            if (request == null)
            {
                throw new NullReferenceException("Request is null");
            }

            if (request.Password != request.PassConfirm)
            {
                return new UserManagerResponse
                {
                    ErrorResponse = new ErrorResponse
                    {
                        Message = "Passwords must match",
                    },
                    IsSuccess = false,
                };
            }

            var userContactInfo = new ContactInfo
            {
                Country = "Croatia",
                City = "Zagreb",
                StreetAddress = "Towny 25 Street",
                PostCode = "10360",
            };

            
            var identityUser = new User
            {
                Name = "Placeholder",
                Surname = "Placeholder",
                UserName = $"{request.Username}@local.com",
                Email = $"{request.Username}@local.com",
                PhoneNumber = "0123456789",
                ContactInfo = userContactInfo,
            };

            var result = await _userManager.CreateAsync(identityUser, request.Password);

            var claim = new Claim(ClaimTypes.Role, "Admin");
            await _userManager.AddClaimAsync(identityUser, claim);

            if (result.Succeeded)
            {
                var tokenResponse = GenerateToken(identityUser);
                return new UserManagerResponse
                {
                    IsSuccess = true,
                    LoginResponse = new LoginResponse
                    {
                        Token = tokenResponse.TokenAsString,
                        ExpireDate = tokenResponse.Token.ValidTo,
                        Username = identityUser.UserName,
                        Role = claim.Value
                    }
                };
            }

            return new UserManagerResponse
            {
                IsSuccess = false,
                ErrorResponse = new ErrorResponse
                {
                    Message = "Admin registration failed",
                    Errors = result.Errors.Select(e => e.Description),
                }
            };
        }

        public async Task<UserManagerResponse> LoginUserAsync(LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return new UserManagerResponse
                {
                    ErrorResponse = new ErrorResponse
                    {
                        Message = "Login failed",
                    },
                    IsSuccess = false,
                };
            }

            var result = await _userManager.CheckPasswordAsync(user, request.Password);

            if (!result)
            {
                return new UserManagerResponse
                {
                    ErrorResponse = new ErrorResponse
                    {
                        Message = "Login failed",
                    },
                    IsSuccess = false,
                };
            }

            var tokenResponse = GenerateToken(user);

            return new UserManagerResponse
            {
                IsSuccess = true,
                LoginResponse = new LoginResponse
                {
                    Token = tokenResponse.TokenAsString,
                    ExpireDate = tokenResponse.Token.ValidTo,
                    Username = user.UserName,
                    Role = tokenResponse.Role,
                }
            };
        }

        public TokenResponse GenerateToken(User user)
        {

            var userClaims = _userManager.GetClaimsAsync(user).Result;
            var userRole = userClaims
                .Where(x => x.Type == ClaimTypes.Role)
                .First();

            var claims = new[]
            {
                new Claim("Email", user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                userRole
            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["AuthSettings:Issuer"],
                audience: _configuration["AuthSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );

            string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

            return new TokenResponse
            {
                Token = token,
                TokenAsString = tokenAsString,
                Role = userRole.Value
            };
        }

        private async void AddEmployeeClaimAsync(User user)
        {
            var claim = new Claim(ClaimTypes.Role, "Employee");
            await _userManager.AddClaimAsync(user, claim);
        }

    }
}


