using Microsoft.EntityFrameworkCore;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.Generics.GenericRepository;
using SNS_DLA.Data;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using SNS_DLA.Models.Filters;
using SNS_DLA.Models.PaginationFilter;
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

        public async Task<IEnumerable<Product>> GetAllProductData(PaginationFilter paginationfilter, CategoryFilter categoryFilter)
        {

            if (categoryFilter.CategoryName != string.Empty) 
            {
                return await dbSet
                .Include(p => p.Subcategory)
                    .ThenInclude(p => p.Category)
                .Where(p => p.Subcategory.Category.Name == categoryFilter.CategoryName)
                .Skip((paginationfilter.PageNumber - 1) * paginationfilter.ItemsPerPage)
                .Take(paginationfilter.ItemsPerPage)
                .ToListAsync();
            }

            if (categoryFilter.CategoryName != string.Empty && categoryFilter.SubcategoryName != string.Empty)
            {
                return await dbSet
                .Include(p => p.Subcategory)
                    .ThenInclude(p => p.Category)
                .Where(p => (p.Subcategory.Category.Name == categoryFilter.CategoryName) && (p.Subcategory.Name == categoryFilter.SubcategoryName))
                .Skip((paginationfilter.PageNumber - 1) * paginationfilter.ItemsPerPage)
                .Take(paginationfilter.ItemsPerPage)
                .ToListAsync();
            }

            return await dbSet
                .Include(p => p.Subcategory)
                    .ThenInclude(p => p.Category)
                .Skip((paginationfilter.PageNumber - 1) * paginationfilter.ItemsPerPage)
                .Take(paginationfilter.ItemsPerPage)
                .ToListAsync();
        }
    }
}
