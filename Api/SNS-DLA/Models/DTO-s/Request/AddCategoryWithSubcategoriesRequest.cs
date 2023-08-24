using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Request
{
    public class AddCategoryWithSubcategoriesRequest
    {
        public string Name { get; set; }

        public ICollection<AddSubcategoryRequest> Subcategories { get; set; }
    }
}
