using System;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenServices
{
    public string CreateToken(AppUsers user)
    {
        var tokenkey = config["TokenKey"] ??
        throw new Exception("Cannot access token from aap settings");

        if(tokenkey.Length < 64)
        
            throw new Exception("your token key must be longer");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenkey));

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier,user.UserName)
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };

            var tokenhandler = new JwtSecurityTokenHandler();
            var token = tokenhandler.CreateToken(tokenDescriptor);

            return tokenhandler.WriteToken(token);  

        
    }
}
