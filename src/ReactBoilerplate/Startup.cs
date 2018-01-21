using System;
using System.Collections.Generic;
using System.IO;
using JavaScriptViewEngine;
using JavaScriptViewEngine.Pool;
using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ReactBoilerplate.Models;
using ReactBoilerplate.Services;

namespace ReactBoilerplate {
	public class Startup {
		IHostingEnvironment _env;

		public Startup(IHostingEnvironment env) {
			_env = env;

			// Set up configuration sources.
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);
			if (env.IsDevelopment()) {
				// For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
				builder.AddUserSecrets<Startup>();
			}

			EnvironmentVariablesExtensions.AddEnvironmentVariables(builder);
			Configuration = builder.Build();
		}

		public IConfigurationRoot Configuration { get; set; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) {
			services.AddMvc();

			services.AddJsEngine(builder => {
				builder.UseNodeRenderEngine(options => {
					options.ProjectDirectory = Path.Combine(_env.ContentRootPath, "Node");
					options.GetModuleName = (path, model, bag, values, area, type) => "hotInstance";
					// This will prevent the node instance from completely restarting.
					// We are doing this because we want a single instance of node to reload a module (via hotInstance)
					// when the file changes.
					options.WatchFileExtensions = new string[0];
				});
				builder.UseSingletonEngineFactory();
			});
			services.Configure<RenderPoolOptions>(options => {
				options.WatchPath = _env.WebRootPath;
				options.WatchFiles = new List<string>
				{
					 Path.Combine(_env.WebRootPath, "pack", "server.generated.js")
				};
				options.WatchDebounceTimeout = (int)TimeSpan.FromSeconds(2).TotalMilliseconds;
			});

			var auth = services.AddAuthentication();
			var googleClientId = Configuration["Authentication:Google:ClientId"];
			var googleClientSecret = Configuration["Authentication:Google:ClientSecret"];
			if (!string.IsNullOrEmpty(googleClientId) && !string.IsNullOrEmpty(googleClientSecret)) {
				auth.AddGoogle("google", o => {
					o.ClientId = googleClientId;
					o.ClientSecret = googleClientSecret;
					o.Scope.Add("email");
					o.Scope.Add("profile");
				});
			}

			var facebookAppId = Configuration["Authentication:Facebook:AppId"];
			var facebookAppSecret = Configuration["Authentication:Facebook:AppSecret"];
			if (!string.IsNullOrEmpty(facebookAppId) && !string.IsNullOrEmpty(facebookAppSecret)) {
				auth.AddFacebook("facebook", o => {
					o.AppId = facebookAppId;
					o.AppSecret = facebookAppSecret;
				});
			}

			// Add framework services.
			services.AddDbContext<ApplicationDbContext>(options =>
					   options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
			// services.AddDbContext<ApplicationDbContext>(options =>
			//     options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

			services.AddIdentity<ApplicationUser, IdentityRole>()
				.AddEntityFrameworkStores<ApplicationDbContext>()
				.AddDefaultTokenProviders();

			services.AddSingleton<IEmailSender, EmailSender>();
			services.AddSingleton<ISmsSender, SmsSender>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory) {
			loggerFactory.AddConsole(Configuration.GetSection("Logging"));
			loggerFactory.AddDebug();

			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
				app.UseDatabaseErrorPage();
				app.UseBrowserLink();
				app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
					HotModuleReplacement = true,
					ReactHotModuleReplacement = true
				});
			}
			else {
				app.UseExceptionHandler("/Home/Error");
			}

			app.UseStatusCodePagesWithReExecute("/Status/Status/{0}");

			app.UseStaticFiles();

			app.UseAuthentication();

			var googleClientId = Configuration["Authentication:Google:ClientId"];
			var googleClientSecret = Configuration["Authentication:Google:ClientSecret"];
			if (!string.IsNullOrEmpty(googleClientId) && !string.IsNullOrEmpty(googleClientSecret)) {
				var options = new GoogleOptions();
				options.ClientId = googleClientId;
				options.ClientSecret = googleClientSecret;
				options.Scope.Add("email");
				options.Scope.Add("profile");
			}
			

			app.UseJsEngine(); // gives a js engine to each request, required when using the JsViewEngine

			app.UseMvc(routes => {
				MapRouteRouteBuilderExtensions.MapRoute(routes, name: "default",
					template: "{controller=Home}/{action=Index}/{id?}");
			});

			app.Use((context, next) => {
				context.Response.StatusCode = 404;
				return next();
			});
		}
	}
}
