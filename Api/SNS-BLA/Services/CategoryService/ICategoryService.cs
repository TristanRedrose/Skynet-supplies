using SNS_BLA.Services.Base.IBaseService;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_BLA.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<bool> AddCategoryWithSubcategories(AddCategoryWithSubcategoriesRequest request);

        Task<IEnumerable<CategoryResponse>> GetAllAsync();

        Task<CategoryResponse> GetByIdAsync(int id);

        Task<bool> DeleteAsync(int id);

        Task<bool> UpdateAsync(int id, string categoryName);

        Task<bool> AddDefaultCategories(List<AddCategoryWithSubcategoriesRequest> categoryList);
    }

}
