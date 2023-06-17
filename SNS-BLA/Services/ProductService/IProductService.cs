using SNS_BLA.Services.Base.IBaseService;
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
    public interface IProductService
    {
        Task<bool> AddProduct(ProductRequest request);

        Task<IEnumerable<ProductResponse>> GetAllAsync();

        Task<ProductResponse> GetByIdAsync(int id);

        Task<bool> DeleteAsync(int id);

        Task<bool> UpdateAsync(int id, ProductRequest request);

        Task<ProductsWithCategoryResponse> GetAllProductData(Filters filters);

        Task<bool> AddDefaultProducts(List<ProductRequest> productList);
    }
}
