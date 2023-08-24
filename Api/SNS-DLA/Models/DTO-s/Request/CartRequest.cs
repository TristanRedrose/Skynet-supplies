using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Request
{
    public class CartRequest
    {
        public List<CartItemRequest> CartItems { get; set; }
    }
    public class CartItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
