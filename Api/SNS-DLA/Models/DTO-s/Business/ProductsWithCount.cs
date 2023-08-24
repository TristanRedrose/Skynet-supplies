using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Business
{
    public class ProductsWithCount
    {
        public List<Product> Products { get; set; }
        public int ProductCount { get; set; }
    }
}
