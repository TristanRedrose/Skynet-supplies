using Microsoft.Extensions.DependencyInjection;
using SNS_BLA.Services.CategoryService;
using SNS_BLA.Services.OrderService;
using SNS_BLA.Services.ProductService;
using SNS_BLA.Services.SubCategoryService;
using SNS_BLA.Services.UserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_BLA
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBusinessAccess(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IProductService, ProductService>();

            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<IOrderService, OrderService>();

            services.AddScoped<ISubcategoryService, SubcategoryService>();

            return services;
        }
    }
}
