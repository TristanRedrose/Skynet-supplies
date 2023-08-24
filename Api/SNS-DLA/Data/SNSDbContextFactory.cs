using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Data
{
    public class SNSDbContextFactory : IDesignTimeDbContextFactory<SNSDbContext>
    {
        public SNSDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(@"D:\Software\Repos\SNS-API\SNS-API\appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<SNSDbContext>();
            var connectionString = configuration.GetConnectionString("SNSDb");
            builder.UseNpgsql(connectionString);

            return new SNSDbContext(builder.Options);
        }
    }
}
