using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Data
{
    public class SNSDbContext : IdentityDbContext<User>
    {

        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }

        public SNSDbContext(DbContextOptions<SNSDbContext> options): base(options)
        {
        
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.UseIdentityColumns();
        }

    }
}
