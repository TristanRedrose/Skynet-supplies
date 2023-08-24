using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SNS_BLA.Services.CategoryService;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;

namespace SNS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "AdminOnly")]
    public class CategoryController : ControllerBase
    {
        private ICategoryService _categoryService;
        public CategoryController(ICategoryService service)
        {
            _categoryService= service;
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] AddCategoryWithSubcategoriesRequest request)
        {
            try
            {
                var actionSuccess = await _categoryService.AddCategoryWithSubcategories(request);

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

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CategoryResponse>>> GetAllAsync()
        {
            try
            {
                var categories = await _categoryService.GetAllAsync();

                if (categories.Any())
                {
                    return Ok(categories);
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
        public async Task<ActionResult<CategoryResponse>> GetByIdAsync([FromRoute] int id)
        {
            try
            {
                var category = await _categoryService.GetByIdAsync(id);

                if (category !=null)
                {
                    return Ok(category);
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
        public async Task<ActionResult> DeleteAsync([FromRoute] int id)
        {
            try
            {
                var actionSuccess = await _categoryService.DeleteAsync(id);

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
        public async Task<ActionResult> UpdateAsync([FromRoute] int id, [FromBody] CategoryUpdateRequest categoryUpdateRequest)
        {
            try
            {
                var actionSuccess = await _categoryService.UpdateAsync(id, categoryUpdateRequest.CategoryName);

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
