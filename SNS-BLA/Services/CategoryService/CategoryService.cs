using Azure.Core;
using SNS_BLA.Services.Base.BaseService;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.Generics.IGenericRepository;
using SNS_DLA.Core.IConfiguration;
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
    public class CategoryService : ICategoryService
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly ICategoryRepository _repository;

        public CategoryService(IUnitOfWork unitOfWork, ICategoryRepository repository)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> AddCategoryWithSubcategories(AddCategoryWithSubcategoriesRequest request)
        {
            var newCategory = new Category
            {
                Name = request.Name,
                SubCategories = new List<SubCategory>(),
            };

            foreach (var subcategory in request.Subcategories)
            {
                var newSubcategory = new SubCategory
                {
                    Name = subcategory.Name,
                };

                newCategory.SubCategories.Add(newSubcategory);
            }

            var result = await _repository.AddCategoryWithSubcategoriesAsync(newCategory);

            await _unitOfWork.CompleteAsync();

            return result;
        }

        public async Task<IEnumerable<CategoryResponse>> GetAllAsync()
        {
            var result = await _repository.GetAllAsync();

            var categoryResponse = new List<CategoryResponse>();

            foreach (var category in result)
            {
                var newCategory = new CategoryResponse
                {
                    CategoryId = category.CategoryId,
                    Name = category.Name,
                    Subcategories = new List<SubcategoryResponse>(),
                };

                foreach (var subcategory in category.SubCategories)
                {
                    var newSubcategory = new SubcategoryResponse
                    {
                        SubcategoryId = subcategory.SubCategoryId,
                        Name = subcategory.Name,
                        CategoryId = subcategory.CategoryId,
                    };

                    newCategory.Subcategories.Add(newSubcategory);
                }

                categoryResponse.Add(newCategory);
            }

            return categoryResponse;
        }

        public async Task<CategoryResponse> GetByIdAsync(int id)
        {
            var result = await _repository.GetByIdAsync(id);

            var categoryResponse = new CategoryResponse
            {
                CategoryId = result.CategoryId,
                Name = result.Name,
                Subcategories = new List<SubcategoryResponse>(),
            };

            foreach (var subcategory in result.SubCategories)
            {
                var subcategoryResponse = new SubcategoryResponse
                {
                    SubcategoryId = subcategory.SubCategoryId,
                    Name = subcategory.Name,
                    CategoryId = subcategory.CategoryId,
                };

                categoryResponse.Subcategories.Add(subcategoryResponse);
            }

            return categoryResponse;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var actionSuccess = await _repository.DeleteAsync(id);

            await _unitOfWork.CompleteAsync();

            return actionSuccess;
        }

        public async Task<bool> UpdateAsync(int id, string categoryName)
        {
            var category = await _repository.GetByIdAsync(id);

            category.Name = categoryName;

            var actionSuccess = await _repository.UpsertAsync(category);

            await _unitOfWork.CompleteAsync();

            return actionSuccess;
        }

        public async Task<bool> AddDefaultCategories(List<AddCategoryWithSubcategoriesRequest> categoryList)
        {
            var existingCategories = await _repository.GetAllAsync();

            if(existingCategories.Any())
            {
                return false;
            }

            foreach (var category in categoryList)
            {
                var newCategory = new Category
                {
                    Name = category.Name,
                    SubCategories = new List<SubCategory>(),
                };

                foreach (var subcategory in category.Subcategories)
                {
                    var newSubcategory = new SubCategory
                    {
                        Name = subcategory.Name,
                    };

                    newCategory.SubCategories.Add(newSubcategory);
                }

                var result = await _repository.AddCategoryWithSubcategoriesAsync(newCategory);

                if(!result)
                {
                    return false;
                }
            }

            await _unitOfWork.CompleteAsync();

            return true;
        }
    }
}
