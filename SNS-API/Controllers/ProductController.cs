using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SNS_BLA.Services.ProductService;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;

namespace SNS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "EmployeeOnly")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService service)
        {
            _productService = service;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ProductResponse>>> GetAllAsync()
        {
            try
            {
                var allProducts = await _productService.GetAllAsync();

                return Ok(allProducts);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id}")]
        public async Task<ActionResult<ProductResponse>> GetByIdAsync([FromRoute] int id)
        {
            try
            {
                var product = await _productService.GetByIdAsync(id);

                if (product != null) 
                {
                    return Ok(product);
                }

                return NotFound();
                
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct([FromBody] ProductRequest request)
        {
            try
            {
                var actionSuccess = await _productService.AddProduct(request);

                if (actionSuccess)
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

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteProduct([FromRoute] int id)
        {
            try
            {
                var actionSuccess = await _productService.DeleteAsync(id);

                if (actionSuccess)
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

        [HttpPatch]
        [Route("{id}")]
        public async Task<ActionResult<bool>> UpdateProduct([FromRoute] int id,[FromBody] ProductRequest request)
        {
            try
            {
                var actionSuccess = await _productService.UpdateAsync(id, request);

                if (actionSuccess)
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
