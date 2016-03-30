using System;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.Mvc;
using JavaScriptViewEngine;
using React.Services;
using JavaScriptViewEngine.Pool;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Authentication.OAuth;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Extensions.WebEncoders;
using React.Models;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using IdentityModel;
using IdentityServer4.Core.Configuration;
using IdentityServer4.Core.Models;
using IdentityServer4.Core.Resources;
using IdentityServer4.Core.Services.InMemory;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.OptionsModel;
using Microsoft.Extensions.PlatformAbstractions;

namespace React
{
    public class Startup
    {
        IHostingEnvironment _env;
        IApplicationEnvironment _appEnv;

        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            _env = env;
            _appEnv = appEnv;

            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();

            VroomJs.AssemblyLoader.EnsureLoaded();
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var cert = new X509Certificate2(Path.Combine(_appEnv.ApplicationBasePath, "idsrv3test.pfx"), "idsrv3test");

            var builder = services.AddIdentityServer(options =>
            {
                options.SigningCertificate = cert;
                // important, tells IdentityServer to use authentication from ASP.NET Identity
                options.AuthenticationOptions.PrimaryAuthenticationScheme = new IdentityOptions().Cookies.ApplicationCookie.AuthenticationScheme;
            });
            builder.AddInMemoryClients(new List<Client>
            {
                new Client
                {
                    ClientId = "client",
                    ClientSecrets = new List<Secret>
                    {
                        new Secret("secret".Sha256())
                    },

                    Flow = Flows.AuthorizationCode,

                    RedirectUris = new List<string> { "http://localhost:5000/signin-idsvr" },

                    AllowedScopes = new List<string>
                    {
                        StandardScopes.OpenId.Name,
                        StandardScopes.Profile.Name,
                        StandardScopes.Email.Name
                    }
                }
            });
            builder.AddInMemoryScopes(new List<Scope>
            {
                StandardScopes.OpenId,
                StandardScopes.ProfileAlwaysInclude,
                StandardScopes.EmailAlwaysInclude
            });
            builder.AddInMemoryUsers(new List<InMemoryUser>
            {
                new InMemoryUser{Subject = "0a7ee81f-289f-4fd4-be64-6f4f199329eb", Username = "alice", Password = "alice",
                    Claims = new[]
                    {
                        new Claim(JwtClaimTypes.Name, "Alice Smith"),
                        new Claim(JwtClaimTypes.GivenName, "Alice"),
                        new Claim(JwtClaimTypes.FamilyName, "Smith"),
                        new Claim(JwtClaimTypes.Email, "AliceSmith@email.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim(JwtClaimTypes.Role, "Admin"),
                        new Claim(JwtClaimTypes.Role, "Geek"),
                        new Claim(JwtClaimTypes.WebSite, "http://alice.com")
                    }
                }
            });

            services.AddMvc()
                 .AddRazorOptions(razor =>
                 {
                     razor.ViewLocationExpanders.Add(new UI.CustomViewLocationExpander());
                 });

            services.AddJsEngine<ReactEnvironmentInitializer>();
            services.Configure<JsPoolOptions>(options =>
            {
                options.WatchPath = _env.WebRootPath;
                options.WatchFiles = new List<string>
                {
                     Path.Combine(_env.WebRootPath, "pack", "server.generated.js")
                };
                options.WatchDebounceTimeout = (int)TimeSpan.FromSeconds(2).TotalMilliseconds;
            });

            // Add framework services.
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]));

services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, UserClaimsPrincipalFactory>();
services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

            services.AddSingleton<IEmailSender, EmailSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");

                // For more details on creating database during deployment see http://go.microsoft.com/fwlink/?LinkID=615859
                try
                {
                    using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                        .CreateScope())
                    {
                        serviceScope.ServiceProvider.GetService<ApplicationDbContext>()
                             .Database.Migrate();
                    }
                }
                catch { }
            }

            app.UseIISPlatformHandler(options => options.AuthenticationDescriptions.Clear());

            app.UseStatusCodePagesWithReExecute("/Status/Status/{0}");
            
            app.UseStaticFiles();

            app.UseIdentity();

            app.UseIdentityServer();

            var googleClientId = Configuration.Get<string>("Authentication:Google:ClientId");
            var googleClientSecret = Configuration.Get<string>("Authentication:Google:ClientSecret");
            if (!string.IsNullOrEmpty(googleClientId) && !string.IsNullOrEmpty(googleClientSecret))
            {
                app.UseGoogleAuthentication(options =>
                {
                    options.ClientId = googleClientId;
                    options.ClientSecret = googleClientSecret;
                    options.Scope.Add("email");
                    options.Scope.Add("profile");
                });
            }

            var facebookAppId = Configuration["Authentication:Facebook:AppId"];
            var facebookAppSecret = Configuration["Authentication:Facebook:AppSecret"];
            if (!string.IsNullOrEmpty(facebookAppId) && !string.IsNullOrEmpty(facebookAppSecret))
            {
                app.UseFacebookAuthentication(options =>
                {
                    options.AppId = facebookAppId;
                    options.AppSecret = facebookAppSecret;
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

            app.Use((context, next) =>
            {
                context.Response.StatusCode = 404;
                return next();
            });
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
