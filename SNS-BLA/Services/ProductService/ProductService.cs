using SNS_BLA.Services.Base.BaseService;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.IConfiguration;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_BLA.Services.ProductService
{
    public class ProductService : IProductService
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IProductRepository _repository;

        public ProductService(IUnitOfWork unitOfWork, IProductRepository repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public async Task<bool> AddProduct(ProductRequest request)
        {
            var newProduct = new Product
            {
                Name = request.Name,
                SubCategoryId = request.SubCategoryId,
                Description = request.Description,
                Price = request.Price,
                Available = true,
            };

            var result = await _repository.AddAsync(newProduct);

            await _unitOfWork.CompleteAsync();

            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _repository.DeleteAsync(id);

            await _unitOfWork.CompleteAsync();

            return result;
        }

        public async Task<IEnumerable<ProductResponse>> GetAllAsync()
        {
            var allProducts = await _repository.GetAllAsync();

            var productsResponse = new List<ProductResponse>();

            foreach (var product in allProducts)
            {
                var productResponse = new ProductResponse
                {
                    Name = product.Name,
                    SubCategoryId = product.SubCategoryId,
                    Available = product.Available,
                    Description = product.Description,
                    Price = product.Price,
                };

                productsResponse.Add(productResponse);
            }

            return productsResponse;
        }

        public async Task<ProductResponse> GetByIdAsync(int id)
        {
            var product = await _repository.GetByIdAsync(id);

            var productResponse = new ProductResponse
            {
                Name = product.Name,
                ProductId = product.ProductId,
                Description = product.Description,
                Price = product.Price,
                Available = product.Available,
                SubCategoryId = product.SubCategoryId,
            };

            return productResponse;
        }

        public async Task<bool> UpdateAsync(int id, ProductRequest request)
        {
            var product = await _repository.GetByIdAsync(id);

            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.SubCategoryId = request.SubCategoryId;

            var result = await _repository.UpsertAsync(product);

            return result;
        }
    }
}
