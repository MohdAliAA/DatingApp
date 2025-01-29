using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[Authorize]
public class UserController (IUserRepository userRepositiry): BaseApiController
{
    //private readonly DataContext _context;

    // public UserController(DataContext context)
    // {
    //     _context = context;
    // }
    [HttpGet]
    public async Task <ActionResult<IEnumerable<MemberDTO>>> GetUsers()
    {
        var users = await userRepositiry.GetMembersAsync();

        //var userstoReturn = mapper.Map<IEnumerable<MemberDTO>>(users);

        return Ok(users);
    } 
    
    [HttpGet ("{username}")] //api/User/2
    public async Task<ActionResult<MemberDTO>> GetUser(string username)
    {
        var user = await userRepositiry.GetMemberAsync(username);

        if (user == null) return NotFound();

        return Ok(user);
    }
}
