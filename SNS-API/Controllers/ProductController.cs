using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SNS_BLA.Services.ProductService;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using SNS_DLA.Models.Filters;

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
        public async Task<ActionResult<ProductsWithCategoryResponse>> GetAllAsync
            (
                [FromQuery] PaginationFilter paginationFilter,
                [FromQuery] CategoryFilter categoriesFilter,
                [FromQuery] SearchFilter searchTerm
            )
        {
            try
            {
                var categoryFilter = new CategoryFilter(categoriesFilter.Category, categoriesFilter.Subcategory);
                var pageFilter = new PaginationFilter(paginationFilter.Page, paginationFilter.ItemsPerPage);
                var searchFilter = new SearchFilter(searchTerm.Search);

                var filters = new Filters
                {
                    CategoryFilter = categoryFilter,
                    SearchFilter = searchFilter,
                    PaginationFilter = pageFilter,
                };

                var allProducts = await _productService.GetAllProductData(filters);

                if (allProducts.ProductCount > 0)
                {
                    return Ok(allProducts);
                }

                return NotFound();
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
