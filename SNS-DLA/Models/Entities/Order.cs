using SNS_DLA.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public ICollection<OrderedProduct> OrderedProducts { get; set; }
        public float CheckoutPrice { get; set; }

        public OrderStatus Status { get; set; }

        public virtual User Customer { get; set; }
    }
}
