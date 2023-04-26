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

namespace SNS_BLA.Services.SubCategoryService
{
    public class SubcategoryService : ISubcategoryService
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly ISubcategoryRepository _repository;

        public SubcategoryService(IUnitOfWork unitOfWork, ISubcategoryRepository repository)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> AddSubcategory(AddSubcategoryRequest request)
        {
            var newSubcategory = new SubCategory 
            { 
                Name = request.Name,
            };

            var result = await _repository.AddAsync(newSubcategory);
            await _unitOfWork.CompleteAsync();
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _repository.DeleteAsync(id);
            await _unitOfWork.CompleteAsync();
            return result;
        }

        public async Task<IEnumerable<SubcategoryResponse>> GetAllAsync()
        {
            var subcategories = await _repository.GetAllAsync();

            var subcategoriesResponse = new List<SubcategoryResponse>();

            foreach( var subcategory in subcategories)
            {
                var subcategoryResponse = new SubcategoryResponse
                {
                    Name = subcategory.Name,
                    CategoryId = subcategory.CategoryId,
                    SubcategoryId = subcategory.SubCategoryId,
                };

                subcategoriesResponse.Add(subcategoryResponse);
            }

            return subcategoriesResponse;
        }

        public async Task<SubcategoryResponse> GetByIdAsync(int id)
        {
            var subcategory = await _repository.GetByIdAsync(id);

            var subcategoryResponse = new SubcategoryResponse
            {
                Name = subcategory.Name,
                CategoryId = subcategory.CategoryId,
                SubcategoryId = subcategory.SubCategoryId,
            };

            return subcategoryResponse;
        }

        public async Task<bool> UpdateAsync(int id, string subcategoryName)
        {
            var subcategory = await _repository.GetByIdAsync(id);

            subcategory.Name = subcategoryName;

            var result = await _repository.UpsertAsync(subcategory);
            await _unitOfWork.CompleteAsync();

            return result;
        }
    }
}
