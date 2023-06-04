using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.Filters
{
    public class CategoryFilter
    {
        public string Category { get; set; }
        public string Subcategory { get; set; }
        public CategoryFilter()
        {
            Category = string.Empty;
            Subcategory = string.Empty;
        }
        public CategoryFilter(string categoryName)
        {
            Category = categoryName;
            Subcategory = string.Empty;
        }
        public CategoryFilter(string categoryName, string subcategoryName)
        {
            Category = categoryName;
            Subcategory = subcategoryName;
        }
    }
}
