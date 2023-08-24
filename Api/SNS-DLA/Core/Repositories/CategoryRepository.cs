using Microsoft.EntityFrameworkCore;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.Generics.GenericRepository;
using SNS_DLA.Data;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Core.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(SNSDbContext context) : base(context)
        {

        }

        public override async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await dbSet.Include(c => c.SubCategories).ToListAsync();
        }

        public override async Task<Category> GetByIdAsync(int id)
        {
            return await dbSet.Include(c => c.SubCategories).Where(c => c.CategoryId == id).FirstAsync();
        }

        public async Task<bool> AddCategoryWithSubcategoriesAsync(Category category)
        {
            await dbSet.AddAsync(category);
            return true;
        }
    }
}
