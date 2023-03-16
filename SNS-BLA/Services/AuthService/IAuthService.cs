using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.DTO_s;
using SNS_DLA.Models.DTO_s.Request;

namespace SNS_BLA.Services.UserService
{
    public interface IAuthService
    {
        public Task<UserManagerResponse> RegisterUserAsync(UserRegistrationRequest request, string claimName);
        public Task<UserManagerResponse> RegisterAdminAsync(AdminRegistrationRequest request);
        public Task<UserManagerResponse> LoginUserAsync(LoginRequest request);
    }
}
