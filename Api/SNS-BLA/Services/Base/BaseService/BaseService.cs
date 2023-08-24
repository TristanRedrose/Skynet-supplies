using SNS_BLA.Services.Base.IBaseService;
using SNS_DLA.Core.Generics.IGenericRepository;
using SNS_DLA.Core.IConfiguration;
using SNS_DLA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_BLA.Services.Base.BaseService
{
    public class BaseService<TEntity> : IBaseService<TEntity> 
        where TEntity : class
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IGenericRepository<TEntity> _repository;

        public BaseService(IUnitOfWork unitOfWork, IGenericRepository<TEntity> repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public async Task<bool> AddAsync(TEntity entity)
        {
            var result = await _repository.AddAsync(entity);
            await _unitOfWork.CompleteAsync();
            return result;
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<bool> UpdateAsync(TEntity entity)
        {
            var result = await _repository.UpsertAsync(entity);
            await _unitOfWork.CompleteAsync();
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _repository.DeleteAsync(id);
            await _unitOfWork.CompleteAsync();
            return result;
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }
    }
}
