using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Response
{
    public class CategoryResponse
    {
        public int CategoryId { get; set; }

        public string Name { get; set; }

        public ICollection<SubcategoryResponse> Subcategories { get; set; }
    }

    public class SubcategoryResponse
    {
        public int SubcategoryId { get; set;}
        public string Name { get; set; }
        public int CategoryId { get; set; }
    }
}
