using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SNS_BLA.Services.UserService;
using SNS_DLA.Models.DTO_s.Response;

namespace SNS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "AdminOrEmployee")]
    public class UserController : ControllerBase
    {
        private IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize(Policy = "AdminOnly")]

        public async Task<IEnumerable<IdentityUser>> GetAllUsersAsync()
        {
            return await _service.GetAllUsersAsync();
        }

        [HttpGet]
        [Route("Employee")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IEnumerable<UserResponse>> GetAllEmployeesAsync()
        {
            return await _service.GetUsersByRole("Employee");
        }

        [HttpGet]
        [Route("Customer")]
        public async Task<IEnumerable<UserResponse>> GetAllCustomersAsync()
        {
            return await _service.GetUsersByRole("Customer");
        }

        [HttpGet]
        [Route("Admin")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IEnumerable<UserResponse>> GetAllAdminsAsync()
        {
            return await _service.GetUsersByRole("Admin");
        }
    }
}
