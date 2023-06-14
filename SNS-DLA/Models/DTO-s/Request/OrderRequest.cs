using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Request
{
    public class OrderInfo
    {
        public string UserEmail { get; set; }
        public List<CartItemRequest> OrderedProducts { get; set; }
        public float TotalPrice { get; set; }
    }

    public class OrderRequest
    {
        public List<CartItemRequest> OrderedProducts { get; set; }
        public float TotalPrice { get; set; }
    }
}
