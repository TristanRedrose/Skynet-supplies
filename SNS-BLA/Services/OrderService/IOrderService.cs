using SNS_BLA.Services.Base.IBaseService;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.DTO_s.Response;
using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_BLA.Services.OrderService
{
    public interface IOrderService
    {
       Task<CartResponse> GetCart(List<CartItemRequest> cartRequest);
       Task<bool> PlaceOrder(OrderInfo orderInfo);
       Task<OrderResponse> GetOrdersAsync(string? email);
       Task<bool> DeleteAsync(int id);
       Task<OrderDetails> GetByIdAsync(int id);
    }
}
