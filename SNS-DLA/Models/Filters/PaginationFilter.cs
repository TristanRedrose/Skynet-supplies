using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.PaginationFilter
{
    public class PaginationFilter
    {
        public int PageNumber { get; set; }
        public int ItemsPerPage { get; set; }
        public PaginationFilter()
        {
            this.PageNumber = 1;
            this.ItemsPerPage = 12;
        }
        public PaginationFilter(int pageNumber, int itemsPerPage)
        {
            PageNumber = pageNumber < 1 ? 1 : pageNumber;
            ItemsPerPage = itemsPerPage > 24 ? 24 : itemsPerPage;
        }
    }
}
