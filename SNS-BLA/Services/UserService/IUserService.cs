using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;

namespace SNS_BLA.Services.UserService
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetAllUsersAsync();
        public Task<IEnumerable<UserResponse>> GetUsersByRole(string id);
        public Task<bool> DeleteUserAsync(string Id);
    }
}
