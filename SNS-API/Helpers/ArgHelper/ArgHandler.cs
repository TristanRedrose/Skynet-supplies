using Microsoft.IdentityModel.Tokens;
using SNS_BLA.Services.UserService;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;

namespace SNS_API.Helpers.ArgHelper
{
    public class ArgHandler
    {
        private IAuthService _service;

        public ArgHandler(IAuthService service)
        {
            _service = service;
        }

        public async Task<UserManagerResponse> AddAdmin()
        {
            string addUsername()
            {
                Console.Write("Enter username: ");
                string username = Console.ReadLine();

                if (username.Any(c => Char.IsWhiteSpace(c)))
                {
                    Console.WriteLine("Username cannot contain whitespace");
                    username = addUsername();
                }

                if (username.Trim(' ').IsNullOrEmpty())
                {
                    Console.WriteLine("Username cannot be empty");
                    username = addUsername();
                }

                return username;
            }

            string addPassword()
            {
                Console.Write("Enter password: ");
                string password = Console.ReadLine();

                if (password.Length < 8)
                {
                    Console.WriteLine("Password must contain at least 8 characters");
                    password = addPassword();
                }

                if (password.Trim(' ').IsNullOrEmpty())
                {
                    Console.WriteLine("Password cannot be empty");
                    password = addPassword();
                }

                return password;
            }

            string confirmPassword(string password)
            {
                Console.Write("Confirm Password: ");
                string passConfirm = Console.ReadLine();

                if (passConfirm != password)
                {
                    Console.WriteLine("Passwords must match");
                    passConfirm = confirmPassword(password);
                }

                return passConfirm;
            }

            string username = addUsername();
            string password = addPassword();
            string passConfirm = confirmPassword(password);

            var request = new AdminRegistrationRequest
            {
                Username = username,
                Password = password,
                PassConfirm = passConfirm,
            };

            var result = await _service.RegisterAdminAsync(request);

            return result;
        }
    }
}
