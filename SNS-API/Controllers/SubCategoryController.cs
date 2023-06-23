using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SNS_API.Controllers.BaseController;
using SNS_BLA.Services.Base.IBaseService;
using SNS_BLA.Services.CategoryService;
using SNS_BLA.Services.SubCategoryService;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;

namespace SNS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "AdminOnly")]
    public class SubcategoryController : ControllerBase
    {
        private ISubcategoryService _subcategoryService;
        public SubcategoryController(ISubcategoryService service)
        {
            _subcategoryService = service;
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] AddSubcategoryRequest request)
        {
            try
            {
                var result = await _subcategoryService.AddSubcategory(request);
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

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<SubcategoryResponse>>> GetAllAsync()
        {
            try
            {
                var subcategories = await _subcategoryService.GetAllAsync();

                if (subcategories.Any()) 
                {
                    return Ok(subcategories);
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
        public async Task<ActionResult<SubCategory>> GetByIdAsync([FromRoute] int id)
        {
            try
            {
                var category = await _subcategoryService.GetByIdAsync(id);

                if (category != null)
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

        [HttpPatch]
        [Route("{id}")]
        public async Task<ActionResult> UpdateSubcategory([FromRoute] int id, [FromBody] UpdateSubcategoryRequest request)
        {
            try
            {
                var actionSuccess = await _subcategoryService.UpdateAsync(id, request.SubcategoryName);

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

        public async Task<ActionResult> DeleteSubcategory([FromRoute] int id)
        {
            try
            {
                var actionSuccess = await _subcategoryService.DeleteAsync(id);

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
