using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SNS_API.Controllers.BaseController;
using SNS_BLA.Services.ProductService;
using SNS_DLA.Models.Entities;

namespace SNS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "EmployeeOnly")]
    public class ProductController : BaseController<Product>
    {
        public ProductController(IProductService service) : base(service)
        {

        }

        [HttpGet]
        [AllowAnonymous]
        public override async Task<ActionResult<IEnumerable<Product>>> GetAllAsync()
        {
            return await base.GetAllAsync();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id}")]
        public override async Task<ActionResult<Product>> GetByIdAsync([FromRoute] int id)
        {
            return await base.GetByIdAsync(id);
        }
    }
}
