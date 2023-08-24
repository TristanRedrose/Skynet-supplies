using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.Filters
{
    public class PaginationFilter
    {
        public int Page { get; set; }
        public int ItemsPerPage { get; set; }
        public PaginationFilter()
        {
            Page = 1;
            ItemsPerPage = 12;
        }
        public PaginationFilter(int pageNumber, int itemsPerPage)
        {
            Page = pageNumber < 1 ? 1 : pageNumber;
            ItemsPerPage = itemsPerPage > 48 ? 48 : itemsPerPage;
        }
    }
}
