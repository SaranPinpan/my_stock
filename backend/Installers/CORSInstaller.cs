using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Installers
{
    public class CORSInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(options =>
           {
               options.AddPolicy("AllowSpecificOrigins", builder =>
               {
                   builder.WithOrigins(
                       "http://localhost:8080",
                       "http://localhost:8080/frontend",
                       "http://example.com",
                       "http://localhost:4200",
                       "http://localhost:1152",
                       "http://192.168.99.100:1152",
                       "https://www.w3schools.com"
                       )
                   .AllowAnyHeader()
                   .AllowAnyMethod();
                   //.WithMethods("GET", "POST", "HEAD");
               });


               /*
                   The browser can skip the preflight request
                   if the following conditions are true:
                   - The request method is GET, HEAD, or POST.
                   - The Content-Type header
                      - application/x-www-form-urlencoded
                      - multipart/form-data
                      - text/plain
               */
           });
        }
    }
}