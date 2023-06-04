using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.Generics.GenericRepository;
using SNS_DLA.Data;
using SNS_DLA.Models.DTO_s.Business;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using SNS_DLA.Models.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Core.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(SNSDbContext context) : base(context)
        {

        }

        public async Task<ProductsWithCount> GetProductsWithCategory(Filters filters)
        {
            var categoryFilter = filters.CategoryFilter;
            var paginationFilter = filters.PaginationFilter;
            var searchFilter = filters.SearchFilter;

            var query = dbSet.Include(p => p.Subcategory).ThenInclude(p => p.Category).Select(p => p);

            if (!string.IsNullOrEmpty(searchFilter.Search)) 
            {
                query = query.Where(p => (p.Name.Contains(searchFilter.Search)));
            }
            
            if (!string.IsNullOrEmpty(categoryFilter.Category))
            {
                query = query.Where(p => p.Subcategory.Category.Name == categoryFilter.Category);
            }

            if (!string.IsNullOrEmpty(categoryFilter.Subcategory))
            {
                query = query.Where(p => p.Subcategory.Name == categoryFilter.Subcategory);
            }

            var productsWithCount = new ProductsWithCount();

            productsWithCount.ProductCount = await query.CountAsync();

            productsWithCount.Products = await query
                .Skip((paginationFilter.Page - 1) * paginationFilter.ItemsPerPage)
                .Take(paginationFilter.ItemsPerPage)
                .ToListAsync();

            return productsWithCount;
        }
    }
}
