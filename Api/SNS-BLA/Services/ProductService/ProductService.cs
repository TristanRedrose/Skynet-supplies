using Azure.Core;
using SNS_BLA.Services.Base.BaseService;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.IConfiguration;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using SNS_DLA.Models.Filters;
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
                SubcategoryId = request.SubcategoryId,
                Description = request.Description,
                Price = request.Price,
                Available = request.Available,
                ImageUrl= request.ImageUrl,
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
                    ProductId = product.ProductId,
                    Name = product.Name,
                    SubcategoryId = product.SubcategoryId,
                    Available = product.Available,
                    Description = product.Description,
                    Price = product.Price,
                    ImageUrl = product.ImageUrl,
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
                SubcategoryId = product.SubcategoryId,
                ImageUrl = product.ImageUrl,
            };

            return productResponse;
        }

        public async Task<bool> UpdateAsync(int id, ProductRequest request)
        {
            var product = await _repository.GetByIdAsync(id);

            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.Available = request.Available;
            product.ImageUrl = request.ImageUrl;

            var result = await _repository.UpsertAsync(product);
            await _unitOfWork.CompleteAsync();

            return result;
        }

        public async Task<ProductsWithCategoryResponse> GetAllProductData(Filters filters)
        {
            var productDetails = await _repository.GetProductsWithCategory(filters);

            var allProducts = new List<ProductWithCategory>();

            foreach (var product in productDetails.Products)
            {
                var productResponse = new ProductWithCategory
                {
                    Price = product.Price,
                    ProductId = product.ProductId,
                    Name = product.Name,
                    ImageUrl = product.ImageUrl,
                    Available = product.Available,
                    Description = product.Description,
                    SubcategoryId = product.SubcategoryId,
                    SubcategoryName = product.Subcategory.Name,
                    CategoryName = product.Subcategory.Category.Name
                };

                allProducts.Add(productResponse);
            }

            var allProductsResponse = new ProductsWithCategoryResponse
            {
                Products = allProducts,
                ProductCount = productDetails.ProductCount,
            };

            return allProductsResponse;
        }

        public async Task<bool> AddDefaultProducts(List<ProductRequest> productList)
        {
            var categoryFilter = new CategoryFilter();
            var pageFilter = new PaginationFilter();
            var searchFilter = new SearchFilter();

            var filters = new Filters
            {
                CategoryFilter = categoryFilter,
                SearchFilter = searchFilter,
                PaginationFilter = pageFilter,
            };
     
            var currentProducts = await _repository.GetProductsWithCategory(filters);

            if (currentProducts.ProductCount > 0)
            {
                return false;
            }

            foreach (var product in productList)
            {
                var newProduct = new Product
                {
                    Name = product.Name,
                    SubcategoryId = product.SubcategoryId,
                    Description = product.Description,
                    Price = product.Price,
                    Available = product.Available,
                    ImageUrl = product.ImageUrl,
                };

                var result = await _repository.AddAsync(newProduct);

                if (!result)
                {
                    return false;
                }
            }

            await _unitOfWork.CompleteAsync();

            return true;
        }
    }
}
