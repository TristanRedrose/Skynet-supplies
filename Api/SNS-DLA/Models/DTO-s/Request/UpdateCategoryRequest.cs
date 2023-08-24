using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Request
{
    public class UpdateCategoryRequest
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }

        public ICollection<SubCategoryData> Subcategories { get; set; }
    }

    public class SubCategoryData
    {
        public int SubcategoryId { get; set;}
        public string Name { get; set; }
    }
}
