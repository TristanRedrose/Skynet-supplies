using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SNS_API.Controllers.BaseController;
using SNS_BLA.Services.OrderService;
using SNS_DLA.Models.Entities;

namespace SNS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "CustomerOrEmployee")]
    public class OrderController : BaseController<Order>
    {
        public OrderController(IOrderService service) : base(service)
        {

        }

        [HttpGet]
        [Authorize(Policy = "EmployeeOnly")]
        public override async Task<ActionResult<IEnumerable<Order>>> GetAllAsync()
        {
            return await base.GetAllAsync();
        }

        [HttpGet]
        [Route("{id}")]
        public override async Task<ActionResult<Order>> GetByIdAsync([FromRoute] int id)
        {
            return await base.GetByIdAsync(id);
        }
    }
}
