using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.Filters
{
    public class SearchFilter
    {
        public string Search { get; set; }

        public SearchFilter()
        {
            Search = string.Empty;
        }

        public SearchFilter(string search)
        {
            Search = search;
        }
    }
}
