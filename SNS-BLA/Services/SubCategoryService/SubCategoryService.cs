using SNS_BLA.Services.Base.BaseService;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.Generics.IGenericRepository;
using SNS_DLA.Core.IConfiguration;
using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_BLA.Services.SubCategoryService
{
    public class SubCategoryService : BaseService<SubCategory>, ISubCategoryService
    {
        public SubCategoryService(IUnitOfWork unitOfWork, ISubCategoryRepository repository) : base(unitOfWork, repository)
        {

        }
    }
}
