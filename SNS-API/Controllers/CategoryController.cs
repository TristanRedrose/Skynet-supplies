using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SNS_API.Controllers.BaseController;
using SNS_BLA.Services.CategoryService;
using SNS_DLA.Models.Entities;

namespace SNS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "EmployeeOnly")]
    public class CategoryController : BaseController<Category>
    {
        public CategoryController(ICategoryService service) : base(service)
        {
            
        }

        [HttpGet]
        [AllowAnonymous]
        public override async Task<ActionResult<IEnumerable<Category>>> GetAllAsync()
        {
            return await base.GetAllAsync();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(":id")]
        public override async Task<ActionResult<Category>> GetByIdAsync(int id)
        {
            return await base.GetByIdAsync(id);
        }
    }
}
