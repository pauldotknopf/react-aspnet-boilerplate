using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.OptionsModel;
using React.Models;

namespace React.Services
{
public class UserClaimsPrincipalFactory : IUserClaimsPrincipalFactory<ApplicationUser>
{
    private IdentityOptions _options;

    public UserClaimsPrincipalFactory(IOptions<IdentityOptions> optionsAccessor)
    {
        _options = optionsAccessor.Value;
    }

    public Task<ClaimsPrincipal> CreateAsync(ApplicationUser user)
    {
        var id = new ClaimsIdentity(_options.Cookies.ApplicationCookieAuthenticationScheme,
            _options.ClaimsIdentity.UserNameClaimType,
            _options.ClaimsIdentity.RoleClaimType);
        id.AddClaim(new Claim(_options.ClaimsIdentity.UserIdClaimType, user.Id));
        id.AddClaim(new Claim(_options.ClaimsIdentity.UserNameClaimType, user.UserName));

        // required by IdentityServer
        id.AddClaim(new Claim(JwtClaimTypes.Name, user.UserName));
        id.AddClaim(new Claim(JwtClaimTypes.Subject, user.Id));
        id.AddClaim(new Claim(JwtClaimTypes.IdentityProvider, _options.Cookies.ApplicationCookieAuthenticationScheme));
        id.AddClaim(new Claim(JwtClaimTypes.AuthenticationTime, DateTimeOffset.UtcNow.ToEpochTime().ToString(), ClaimValueTypes.Integer));

        return Task.FromResult(new ClaimsPrincipal(id));
    }
}
}
