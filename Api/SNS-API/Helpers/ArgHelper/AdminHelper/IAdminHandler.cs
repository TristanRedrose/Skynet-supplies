using SNS_DLA.Models.DTO_s.Response;

namespace SNS_API.Helpers.ArgHelper.AdminHelper
{
    public interface IAdminHandler
    {
        public Task<UserManagerResponse> AddAdmin();
    }
}
