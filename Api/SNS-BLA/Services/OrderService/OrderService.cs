using SNS_BLA.Services.Base.BaseService;
using SNS_BLA.Services.UserService;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.IConfiguration;
using SNS_DLA.Enums;
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
    public class OrderService : IOrderService
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IProductRepository _productRepository;
        protected readonly IOrderRepository _orderRepository;
        protected readonly IUserService _userService;

        public OrderService
            (   IUnitOfWork unitOfWork,
                IProductRepository productRepository,
                IOrderRepository orderRepository,
                IUserService userService
            )
            {
                _unitOfWork = unitOfWork;
                _productRepository = productRepository;
                _orderRepository = orderRepository;
                _userService = userService;
            }

        public async Task<CartResponse> GetCart(List<CartItemRequest> cartItemsRequest)
        {
            var cartResponse = new CartResponse
            {
                CartItems = new List<CartItem>(),
            };

            foreach (var itemRequest in cartItemsRequest)
            {
                var product = await _productRepository.GetByIdAsync(itemRequest.ProductId);

                var item = new CartItem
                {
                    ProductId = product.ProductId,
                    Name = product.Name,
                    ImageUrl = product.ImageUrl,
                    Price = product.Price,
                    Quantity = itemRequest.Quantity,
                    TotalPrice = product.Price * itemRequest.Quantity,
                };

                cartResponse.CartItems.Add(item);
            }

            return cartResponse;
        }

        public async Task<bool> PlaceOrder(OrderInfo orderInfo)
        {
            var orderedProducts = new List<OrderedProduct>();

            var users = await _userService.GetAllUsersAsync();

            var user = users.FirstOrDefault(u => u.Email == orderInfo.UserEmail);

            if (user == null)
            {
                return false;
            }

            foreach( var itemOrder in orderInfo.OrderedProducts)
            {
                var orderedProduct = new OrderedProduct
                {
                    ProductId = itemOrder.ProductId,
                    Quantity = itemOrder.Quantity,
                };

                orderedProducts.Add(orderedProduct);
            }

            var order = new Order
            {
                OrderedProducts = orderedProducts,
                Customer = user,
                CheckoutPrice = orderInfo.TotalPrice,
                Status = OrderStatus.Pending,
            };

            var success = await _orderRepository.AddAsync(order);

            await _unitOfWork.CompleteAsync();

            return success;
        }

        public async Task<OrderResponse> GetOrdersAsync(string? email)
        { 
            var orderResponse = new OrderResponse();
            orderResponse.Orders = new List<OrderDetails>();

            var allOrders = await _orderRepository.GetAllOrdersWithProducts();

            if (email != null)
            {
                allOrders = allOrders.Where(o => o.Customer.Email == email);
            }

            foreach(var order in allOrders)
            {
                var orderInfo = new OrderDetails
                {
                    OrderId = order.OrderId,
                    CustomerId = order.Customer.Id,
                    CustomerName = order.Customer.Name,
                    CheckoutPrice = order.CheckoutPrice,
                    CartItems = new List<CartItem>(),
                    Status = order.Status,
                };
                
                foreach( var orderedProduct in order.OrderedProducts)
                {
                    var item = new CartItem
                    {
                        ProductId = orderedProduct.ProductId,
                        Name = orderedProduct.Product.Name,
                        ImageUrl = orderedProduct.Product.ImageUrl,
                        Price = orderedProduct.Product.Price,
                        Quantity = orderedProduct.Quantity,
                        TotalPrice = orderedProduct.Product.Price * orderedProduct.Quantity,
                    };

                    orderInfo.CartItems.Add(item);
                }

                orderResponse.Orders.Add(orderInfo);
            }

            return orderResponse;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _orderRepository.DeleteAsync(id);

            await _unitOfWork.CompleteAsync();

            return result;
        }

        public async Task<OrderDetails> GetByIdAsync(int id)
        {
            var order = await this._orderRepository.GetByIdAsync(id);

            var orderDetails = new OrderDetails
            {
                OrderId = order.OrderId,
                CartItems = new List<CartItem>(),
                CustomerId = order.Customer.Id,
                CustomerName = order.Customer.Name,
                CheckoutPrice = order.CheckoutPrice,
                Status = order.Status,
            };

            foreach (var orderedProduct in order.OrderedProducts)
            {
                var item = new CartItem
                {
                    ProductId = orderedProduct.ProductId,
                    Name = orderedProduct.Product.Name,
                    ImageUrl = orderedProduct.Product.ImageUrl,
                    Price = orderedProduct.Product.Price,
                    Quantity = orderedProduct.Quantity,
                    TotalPrice = orderedProduct.Product.Price * orderedProduct.Quantity,
                };

                orderDetails.CartItems.Add(item);
            }

            return orderDetails;
        }
    }
}
