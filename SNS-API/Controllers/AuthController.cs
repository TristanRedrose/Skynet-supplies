using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SNS_BLA.Services.UserService;
using SNS_DLA.Models.DTO_s;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;

namespace SNS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }


        [HttpPost]
        [Route("Register")]

        public async Task<IActionResult> RegisterAsync([FromBody] UserRegistrationRequest request)
        {

            if (ModelState.IsValid)
            {
                var result = await _service.RegisterUserAsync(request, "Customer");
                if (!result.IsSuccess)
                {
                    return BadRequest(result.ErrorResponse);
                }

                return Ok(result.LoginResponse);
            }

            return BadRequest("Some properties are not valid");
        }

        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        [Route("Register/Employee")]

        public async Task<IActionResult> RegisterEmployeeAsync([FromBody] UserRegistrationRequest request)
        {

            if (ModelState.IsValid)
            {
                var result = await _service.RegisterUserAsync(request, "Employee");
                if (!result.IsSuccess)
                {
                    return BadRequest(result.ErrorResponse);
                }

                return Ok(result.IsSuccess);
            }

            return BadRequest("Some properties are not valid");
        }

        [HttpPost]
        [Route("Login")]

        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request)
        {
            if (ModelState.IsValid)
            {
                var result = await _service.LoginUserAsync(request);

                if (!result.IsSuccess)
                {
                    return BadRequest(result);
                }

                return Ok(result.LoginResponse);
            }

            return BadRequest("Some properties are not valid");
        }
    }
}
