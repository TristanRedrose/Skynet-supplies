using SNS_DLA.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Response
{
    public class OrderResponse
    {
        public List<OrderDetails> Orders { get; set; }
    }

    public class OrderDetails
    {
        public string CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int OrderId { get; set; }
        public List<CartItem> CartItems { get; set; }
        public float CheckoutPrice { get; set; }
        public OrderStatus Status { get; set; }
    }
}
