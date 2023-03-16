using Microsoft.Extensions.DependencyInjection;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.IConfiguration;
using SNS_DLA.Core.Repositories;
using SNS_DLA.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA
{
    public static class DependencyInjection
    {

        public static IServiceCollection AddDataAccess(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ISubCategoryRepository, SubCategoryRepository>();

            return services;
        }
    }
}
