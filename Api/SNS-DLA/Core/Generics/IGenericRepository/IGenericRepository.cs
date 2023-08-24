using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Core.Generics.IGenericRepository
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<bool> AddAsync(TEntity entity);
        Task<bool> UpsertAsync(TEntity entity);
        Task<TEntity> GetByIdAsync(int id);
        Task<bool> DeleteAsync(int id);

    }
}
