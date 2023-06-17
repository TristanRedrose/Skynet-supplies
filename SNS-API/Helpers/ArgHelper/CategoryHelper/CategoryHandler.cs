using SNS_BLA.Services.CategoryService;
using SNS_DLA.Models.DTO_s.Request;
using System.Text.Json;

namespace SNS_API.Helpers.ArgHelper.CategoryHelper
{
    public class CategoryHandler : ICategoryHandler
    {
        private ICategoryService _categoryService;

        public CategoryHandler(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        public async Task<bool> AddDefaultCategories()
        {
            var categoriesText = File.ReadAllText(@"D:\Software\Repos\SNS-API\SNS-API\Helpers\Data\DefaultCategoriesList.json");

            var categoryList = JsonSerializer.Deserialize<List<AddCategoryWithSubcategoriesRequest>>(categoriesText, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });

            return await _categoryService.AddDefaultCategories(categoryList);
        }
    }
}
