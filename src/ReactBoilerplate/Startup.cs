using System;
using System.Collections.Generic;
using System.IO;
using JavaScriptViewEngine;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ReactBoilerplate.Models;
using ReactBoilerplate.Services;

namespace ReactBoilerplate
{
    public class Startup
    {
        IHostingEnvironment _env;
        IConfiguration _configuration;
        ILoggerFactory _loggerFactory;

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddJsEngine(builder =>
            {
                builder.UseSingletonEngineFactory();
                builder.UseNodeRenderEngine(nodeOptions =>
                {
                    nodeOptions.ProjectDirectory = Path.Combine(_env.WebRootPath, "pack");
                    nodeOptions.GetModuleName = (path, model, bag, values, area, type) => "server.generated";
                    nodeOptions.NodeInstanceOutputLogger = _loggerFactory.CreateLogger("NodeRenderEngine");
                });
            });
            services.AddMvc();

            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                 options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));
            // services.AddDbContext<ApplicationDbContext>(options =>
            //     options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddSingleton<IEmailSender, EmailSender>();
            services.AddSingleton<ISmsSender, SmsSender>();
      
            var authBuilder = services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(o => o.LoginPath = new PathString("/login"));

            var facebookAppId = _configuration["Authentication:Facebook:AppId"];
            var facebookAppSecret = _configuration["Authentication:Facebook:AppSecret"];
            if (!string.IsNullOrEmpty(facebookAppId) && !string.IsNullOrEmpty(facebookAppSecret))
            {
                authBuilder.AddFacebook(o =>
                {
                    o.AppId = facebookAppId;
                    o.AppSecret = facebookAppSecret;
                });
            }

            var googleClientId = _configuration["Authentication:Google:ClientId"];
            var googleClientSecret = _configuration["Authentication:Google:ClientSecret"];
            if (!string.IsNullOrEmpty(googleClientId) && !string.IsNullOrEmpty(googleClientSecret))
            {
                authBuilder.AddGoogle(o =>
                {
                    o.ClientId = googleClientId;
                    o.ClientSecret = googleClientSecret;
                    o.Scope.Add("email");
                    o.Scope.Add("profile");
                });
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(_configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            _loggerFactory = loggerFactory;
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseAuthentication();
            
            app.UseStatusCodePagesWithReExecute("/Status/Status/{0}");

            app.UseStaticFiles();

            app.UseJsEngine(); // gives a js engine to each request, required when using the JsViewEngine

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.Use((context, next) => {
                context.Response.StatusCode = 404;
                return next();
            });
        }
    }
}
