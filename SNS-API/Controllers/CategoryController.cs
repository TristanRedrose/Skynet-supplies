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
    [Authorize(Policy = "AdminOnly")]
    public class CategoryController : BaseController<Category>
    {
        public CategoryController(ICategoryService service) : base(service)
        {
            
        }

        [HttpPost]
        [AllowAnonymous]
        public override async Task<ActionResult> AddAsync([FromBody] Category category)
        {
            return await base.AddAsync(category);
        }

        [HttpGet]
        [AllowAnonymous]
        public override async Task<ActionResult<IEnumerable<Category>>> GetAllAsync()
        {
            return await base.GetAllAsync();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id}")]
        public override async Task<ActionResult<Category>> GetByIdAsync([FromRoute] int id)
        {
            return await base.GetByIdAsync(id);
        }
    }
}
