using SNS_BLA.Services.Base.BaseService;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.IConfiguration;
using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_BLA.Services.CategoryService
{
    public class CategoryService : BaseService<Category> , ICategoryService
    {

        public CategoryService(IUnitOfWork unitOfWork, ICategoryRepository repository) : base(unitOfWork, repository)
        {
           
        }
    }
}
