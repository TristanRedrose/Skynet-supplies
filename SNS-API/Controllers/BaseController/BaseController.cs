using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SNS_BLA.Services.Base.IBaseService;
using SNS_DLA.Models;

namespace SNS_API.Controllers.BaseController
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController<TEntity> : ControllerBase  where TEntity : class
        
    {
        protected readonly IBaseService<TEntity> _service;

        public BaseController(IBaseService<TEntity> service)
        {
            _service = service;
        }

        [HttpPost]
        public virtual async Task<ActionResult> AddAsync(TEntity entity)
        {
            var actionSucces = await _service.AddAsync(entity);
            if (actionSucces)
            {
                return Ok("Item added");
            }
            
            return BadRequest("Something went wrong");
            
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> GetAllAsync()
        {
            var categories = await _service.GetAllAsync();
            if (categories != null)
            {
                return Ok(categories);
            }
            
            return NotFound();
            
        }

        [HttpPatch]
        public async Task<ActionResult> UpdateAsync(TEntity entity)
        {
            var actionSuccess = await _service.UpdateAsync(entity);
            if (actionSuccess)
            {
                return Ok("Item updated");
            }
            
            return BadRequest("Something went wrong");
            
        }

        [HttpGet]
        [Route(":id")]
        public virtual async Task<ActionResult<TEntity>> GetByIdAsync(int id)
        {
            
            var item = await _service.GetByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpDelete]
        [Route(":id")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var actionSuccess = await _service.DeleteAsync(id);
            if (actionSuccess)
            {
                return Ok("Item deleted");
            }

            return NotFound("Something went wrong");

        }

        internal void AddAsync()
        {
            throw new NotImplementedException();
        }
    }
}
