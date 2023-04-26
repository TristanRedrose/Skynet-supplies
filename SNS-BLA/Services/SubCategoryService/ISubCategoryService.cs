using SNS_BLA.Services.Base.IBaseService;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_BLA.Services.SubCategoryService
{
    public interface ISubcategoryService
    {
        Task<bool> AddSubcategory(AddSubcategoryRequest request);

        Task<IEnumerable<SubcategoryResponse>> GetAllAsync();

        Task<SubcategoryResponse> GetByIdAsync(int id);

        Task<bool> DeleteAsync(int id);

        Task<bool> UpdateAsync(int id, string subcategoryName);
    }
}
