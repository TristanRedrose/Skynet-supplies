using SNS_BLA.Services.ProductService;
using SNS_DLA.Models.DTO_s.Request;
using System.Text.Json;

namespace SNS_API.Helpers.ArgHelper.ProductHelper
{
    public class ProductHandler : IProductHandler
    {
        private IProductService _productService;

        public ProductHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<bool> AddDefaultProducts()
        {
            var productText = File.ReadAllText(@"D:\Software\Repos\SNS-API\SNS-API\Helpers\Data\DefaultProductList.json");

            var productList = JsonSerializer.Deserialize<List<ProductRequest>>(productText, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });

            return await _productService.AddDefaultProducts(productList);
        }
    }
}
