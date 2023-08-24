using SNS_DLA.Core.Contracts;
using SNS_DLA.Core.IConfiguration;
using SNS_DLA.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Data
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly SNSDbContext _context;

        public ICategoryRepository Categories { get; private set; }
        public IProductRepository Products { get; private set; }
        public IOrderRepository Orders { get; private set; }

        public UnitOfWork(SNSDbContext context)
        {
            _context = context;

            Categories = new CategoryRepository(_context);

            Products = new ProductRepository(_context);

            Orders = new OrderRepository(_context);
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            ((IDisposable)_context).Dispose();
        }
    }
}
