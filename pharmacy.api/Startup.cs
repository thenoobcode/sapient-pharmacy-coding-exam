using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using pharmacy.api.Mappings;
using pharmacy.api.Models;
using pharmacy.api.Services;

namespace pharmacy.api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var medicines = GenerateMedicines();
            services.AddHttpContextAccessor();
            services.AddSingleton(provider => new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MedicineMappings());
            }).CreateMapper());

            services.AddSingleton((IServiceProvider arg) => medicines);
            services.AddScoped<IMedicineService, MedicineService>();

            services.AddCors();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //}

            app.UseExceptionHandler("/error/handle");

            app.UseHttpsRedirection();

            app.UseCors((options) =>
            {
                options.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private List<MedicineDetails> GenerateMedicines()
        {
            var medicines = new List<MedicineDetails>();
            string[] brands = { "Brand 1", "Brand 2", "Brand 3" };
            for(int i = 0; i < 10; i++)
            {
                medicines.Add(new MedicineDetails
                {
                    Name = "Medicine " + (i + 1),
                    Brand = brands[i % brands.Length],
                    ExpiryDate= DateTime.UtcNow.AddDays(i*5),
                    Price= GetRandomValue(100, 1000),
                    Quantity=GetRandomValue(0, 30)
                });
            }

            return medicines;
        }

        private int GetRandomValue(int min, int max)
        {
            Random r = new Random();
            return r.Next(min, max);
        }
    }
}
