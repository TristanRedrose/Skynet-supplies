using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SNS_BLA.Services.UserService;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;

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

        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetAllUsersAsync()
        {
            try
            {
                var users = await _service.GetAllUsersAsync();

                if (users.Any())
                {
                    return Ok(users);
                }
                return NotFound();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
        }

        [HttpGet]
        [Route("Employee")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<IEnumerable<UserResponse>>> GetAllEmployeesAsync()
        {
            try
            {
                var employees = await _service.GetUsersByRole("Employee");

                if (employees.Any())
                {
                    return Ok(employees);
                }

                return NotFound();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("Customer")]
        public async Task<ActionResult<IEnumerable<UserResponse>>> GetAllCustomersAsync()
        {
            try
            {
                var customers = await _service.GetUsersByRole("Customer");

                if (customers.Any())
                {
                    return Ok(customers);
                }

                return NotFound();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("Admin")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<IEnumerable<UserResponse>>> GetAllAdminsAsync()
        {   try
            {
                var admins = await _service.GetUsersByRole("Admin");

                if (admins.Any())
                {
                    return Ok(admins);
                }

                return NotFound();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteUserAsync([FromRoute] string id)
        {
            try
            {
                bool success = await _service.DeleteUserAsync(id);

                if (success)
                {
                    return Ok();
                }

                return BadRequest();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<UserDetails>> GetUserByIdAsync([FromRoute] string id)
        {
            try
            {
                var user = await _service.GetUserByIdAsync(id);

                if (user != null)
                {
                    return Ok(user);
                }

                return NotFound();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPatch]
        public async Task<ActionResult> UpdateUserAsync([FromBody] UserDetails userData)
        {
            try
            {
                var result = await _service.UpdateUserAsync(userData);

                if (result)
                {
                    return Ok();
                }

                return BadRequest();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
        }

    }
}
