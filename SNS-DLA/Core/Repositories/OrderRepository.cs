using Microsoft.EntityFrameworkCore;
using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.Generics.GenericRepository;
using SNS_DLA.Data;
using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Core.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(SNSDbContext context) : base(context)
        {

        }
        public async Task<IEnumerable<Order>> GetAllOrdersWithProducts()
        {
            var result = await dbSet
                .Include(o => o.Customer)
                .Include(o => o.OrderedProducts)
                    .ThenInclude(op => op.Product)
                .ToListAsync();

            return result;
        }

        public override async Task<bool> DeleteAsync(int id)
        {
            var item = await dbSet.Include(o => o.OrderedProducts).FirstOrDefaultAsync(o => o.OrderId == id);
            if (item != null)
            {
                dbSet.Remove(item);
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
