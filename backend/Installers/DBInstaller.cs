using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Installers
{
    public class DBInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(options =>
            options.UseSqlite(configuration.GetConnectionString("ConnectionSQLite")));

            // services.AddDbContext<DataContext>(options =>
            //   options.UseSqlServer(configuration.GetConnectionString("ConnectionSQLServer")));
        }
    }
}