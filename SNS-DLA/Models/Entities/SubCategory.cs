using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.Entities
{
    public class SubCategory
    {
        public int SubCategoryId { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}
