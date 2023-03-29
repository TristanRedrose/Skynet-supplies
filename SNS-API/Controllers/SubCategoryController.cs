using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SNS_API.Controllers.BaseController;
using SNS_BLA.Services.Base.IBaseService;
using SNS_BLA.Services.SubCategoryService;
using SNS_DLA.Models.Entities;

namespace SNS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "EmployeeOnly")]
    public class SubCategoryController : BaseController<SubCategory>
    {
        public SubCategoryController(ISubCategoryService service) : base(service)
        {

        }

        [HttpGet]
        [AllowAnonymous]
        public override async Task<ActionResult<IEnumerable<SubCategory>>> GetAllAsync()
        {
            return await base.GetAllAsync();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id}")]
        public override async Task<ActionResult<SubCategory>> GetByIdAsync([FromRoute] int id)
        {
            return await base.GetByIdAsync(id);
        }
    }
}
