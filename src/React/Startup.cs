using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using JavaScriptViewEngine;
using System.IO;
using System.Collections.Generic;
using JavaScriptViewEngine.Pool;
using React.Models;
using React.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace React
{
    public class Startup
    {
        IHostingEnvironment _env;

        public Startup(IHostingEnvironment env)
        {
            _env = env;

            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddJsEngine();
            services.Configure<RenderPoolOptions>(options =>
            {
                options.WatchPath = _env.WebRootPath;
                options.WatchFiles = new List<string>
                {
                     Path.Combine(_env.WebRootPath, "pack", "server.generated.js")
                };
                options.WatchDebounceTimeout = (int)TimeSpan.FromSeconds(2).TotalMilliseconds;
            });
            services.Configure<NodeRenderEngineOptions>(options =>
            {
                options.ProjectDirectory = Path.Combine(_env.WebRootPath, "pack");
                options.GetArea = (area) =>
                {
                    switch (area)
                    {
                        case "default":
                            return "server.generated";
                        default:
                            return area;
                    }
                };
            });

            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                 options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddSingleton<IEmailSender, EmailSender>();
            services.AddSingleton<ISmsSender, SmsSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            
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
            
            app.UseStatusCodePagesWithReExecute("/Status/Status/{0}");

            app.UseStaticFiles();

            app.UseIdentity();

            var googleClientId = Configuration["Authentication:Google:ClientId"];
            var googleClientSecret = Configuration["Authentication:Google:ClientSecret"];
            if (!string.IsNullOrEmpty(googleClientId) && !string.IsNullOrEmpty(googleClientSecret))
            {
                var options = new GoogleOptions();
                options.ClientId = googleClientId;
                options.ClientSecret = googleClientSecret;
                options.Scope.Add("email");
                options.Scope.Add("profile");
            }

            var facebookAppId = Configuration["Authentication:Facebook:AppId"];
            var facebookAppSecret = Configuration["Authentication:Facebook:AppSecret"];
            if (!string.IsNullOrEmpty(facebookAppId) && !string.IsNullOrEmpty(facebookAppSecret))
            {
                app.UseFacebookAuthentication(new FacebookOptions
                {
                    AppId = facebookAppId,
                    AppSecret = facebookAppSecret
                });
            }

            // To authenticate with an instance of IdentityServer4, use the following client.
            // ---------------------------------- 
            // new Client
            // {
            //     ClientId = "client",
            //     ClientSecrets = new List<Secret>
            //     {
            //         new Secret("secret".Sha256())
            //     },

            //     Flow = Flows.AuthorizationCode,

            //     RedirectUris = new List<string> { "http://localhost:5000/signin-idsvr" },

            //     AllowedScopes = new List<string>
            //     {
            //         StandardScopes.OpenId.Name,
            //         StandardScopes.Profile.Name,
            //         StandardScopes.Email.Name
            //     }
            // }
            // ----------------------------------
            // Make sure IdentityServer is listening locally on port 5001.
            // Then, uncomment the following.
            //app.UseOAuthAuthentication(options =>
            //{
            //    options.DisplayName = "Identity Server";
            //    options.CallbackPath = new PathString("/signin-idsvr");
            //    options.AuthenticationScheme = "idsvr";
            //    options.ClientSecret = "secret";
            //    options.ClientId = "client";
            //    options.AuthorizationEndpoint = "http://localhost:5001/connect/authorize";
            //    options.TokenEndpoint = "http://localhost:5001/connect/token";
            //    options.UserInformationEndpoint = "http://localhost:5001/connect/userinfo";
            //    options.Scope.Add("openid");
            //    options.Scope.Add("profile");
            //    options.Scope.Add("email");
            //    options.Events = new OAuthEvents
            //    {
            //        OnCreatingTicket = async context =>
            //        {
            //            var request = new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
            //            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);
            //            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //            var response = await context.Backchannel.SendAsync(request, context.HttpContext.RequestAborted);
            //            response.EnsureSuccessStatusCode();

            //            var user = JObject.Parse(await response.Content.ReadAsStringAsync());

            //            var id = user.Value<string>("sub");
            //            if (!string.IsNullOrEmpty(id))
            //            {
            //                context.Identity.AddClaim(new Claim(
            //                    ClaimTypes.NameIdentifier, id,
            //                    ClaimValueTypes.String, context.Options.ClaimsIssuer));
            //            }

            //            var name = user.Value<string>("name");
            //            if (!string.IsNullOrEmpty(name))
            //            {
            //                context.Identity.AddClaim(new Claim(
            //                    ClaimTypes.Name, name,
            //                    ClaimValueTypes.String, context.Options.ClaimsIssuer));
            //            }

            //            var email = user.Value<string>("email");
            //            if (!string.IsNullOrEmpty(email))
            //            {
            //                context.Identity.AddClaim(new Claim(
            //                    ClaimTypes.Email, email,
            //                    ClaimValueTypes.String, context.Options.ClaimsIssuer));
            //            }
            //        }
            //    };
            //});


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
