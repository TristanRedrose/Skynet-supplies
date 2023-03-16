using Microsoft.EntityFrameworkCore;
using SNS_DLA.Core.Generics.IGenericRepository;
using SNS_DLA.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Core.Generics.GenericRepository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected SNSDbContext _context;

        protected DbSet<TEntity> dbSet;

        public GenericRepository(SNSDbContext context)
        {
            _context = context;
            dbSet = context.Set<TEntity>();
        }

        public virtual async Task<bool> AddAsync(TEntity entity)
        {
            await dbSet.AddAsync(entity);
            return true;
        }

        public virtual async Task<bool> UpsertAsync(TEntity entity)
        {
            dbSet.Update(entity);
            return true;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await dbSet.ToListAsync();
        }

        public virtual async Task<bool> DeleteAsync(int id)
        {
            var item = await dbSet.FindAsync(id);
            if (item != null)
            {
                dbSet.Remove(item);
                return true;
            }
            else
            {
                return false;
            }
        }

        public virtual async Task<TEntity> GetByIdAsync(int id)
        {
            return await dbSet.FindAsync(id);
        }
    }
}
