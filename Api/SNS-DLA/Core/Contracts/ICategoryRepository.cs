using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SNS_DLA.Core.Generics.IGenericRepository;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;

namespace SNS_DLA.Core.Contracts
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task<bool> AddCategoryWithSubcategoriesAsync(Category category);
    }
}
