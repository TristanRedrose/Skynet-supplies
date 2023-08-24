using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.Filters
{
    public class Filters
    {
        public CategoryFilter CategoryFilter { get; set; }
        public PaginationFilter PaginationFilter { get; set; }
        public SearchFilter SearchFilter { get; set; }
    }
}
