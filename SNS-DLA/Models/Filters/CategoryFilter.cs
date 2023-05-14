using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.Filters
{
    public class CategoryFilter
    {
        public string CategoryName { get; set; }
        public string SubcategoryName { get; set; }
        public CategoryFilter()
        {
            this.CategoryName = string.Empty;
            this.SubcategoryName = string.Empty;
        }
        public CategoryFilter(string categoryName)
        {
            CategoryName = categoryName;
            SubcategoryName = string.Empty;
        }
        public CategoryFilter(string categoryName, string subcategoryName)
        {
            CategoryName = categoryName;
            SubcategoryName = subcategoryName;
        }
    }
}
