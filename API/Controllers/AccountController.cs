using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Unicode;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenServices tokenServices) : BaseApiController
{
    [HttpPost("Register")] //account/register

    public async Task<ActionResult<UserDto>>Register(RegisterDto registerDto)
    {
        // if(await UserExits(registerDto.Username))
        // return BadRequest("Username is taken");

        // using var hmac = new HMACSHA512();

        // var user = new AppUsers
        // {
            
        //     UserName = registerDto.Username.ToLower(),
        //     PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        //     PasswordSalt = hmac.Key,

        // };
        // context.Users.Add(user);
        // await context.SaveChangesAsync();

        // return new UserDto
        // {
        //     Username = user.UserName,
        //     Token = tokenServices.CreateToken(user)
        // };
        return Ok();
    }

    private async Task<bool> UserExits(string username)
    {
        return await context.Users.AnyAsync(x=>x.UserName.ToLower() == username.ToLower());
    }

    [HttpPost("Login")]

    public async Task<ActionResult<UserDto>>UserLogin (LoginDto loginDto)
    {
         var user = await context.Users.FirstOrDefaultAsync(x=>x.UserName == loginDto.username.ToLower()) ;
 
         if (user == null)
         {
            return Unauthorized("Invalid Username");
         }

         using var hmac = new HMACSHA512(user.PasswordSalt);

         var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

         for (int i = 0; i < ComputeHash.Length;i++) 
         {
            if (ComputeHash[i] != user.PasswordHash[i])
            {
                return Unauthorized("Password is invalid!");
            }
         }

         return new UserDto
         {
            Username = user.UserName,
            Token = tokenServices.CreateToken(user)
         };

    }
}
