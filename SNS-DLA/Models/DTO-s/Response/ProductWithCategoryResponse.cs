using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Response
{
    public class ProductWithCategoryResponse
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string ImageUrl { get; set; }
        public bool Available { get; set; }
        public int SubcategoryId { get; set; }
        public string CategoryName { get; set; }
        public string SubcategoryName { get; set; }
    }
}
