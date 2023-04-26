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
                var result = await _categoryService.AddCategoryWithSubcategories(request);

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CategoryResponse>>> GetAllAsync()
        {
            try
            {
                var categories = await _categoryService.GetAllAsync();

                return Ok(categories);
            }
            catch
            {
                return BadRequest();
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

                return Ok(category);
            }
            catch
            {
                return BadRequest();
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

                return NotFound();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<ActionResult> UpdateAsync([FromRoute] int id, [FromBody] CategoryUpdateRequest categoryUpdateRequest)
        {
            

            var actionSuccess = await _categoryService.UpdateAsync(id, categoryUpdateRequest.CategoryName);

            if (actionSuccess)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
