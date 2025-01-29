using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class UserRepository(DataContext dataContext, IMapper mapper) : IUserRepository
{
    public async Task<MemberDTO?> GetMemberAsync(string username)
    {
        return await dataContext.Users
        .Where(x=>x.UserName==username)
        .ProjectTo<MemberDTO>(mapper.ConfigurationProvider).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDTO>> GetMembersAsync()
    {
        return await dataContext.Users
        .ProjectTo<MemberDTO>(mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<AppUsers?> GetUserByIdAsync(int id)
    {

        return await dataContext.Users.FindAsync(id);
    }

    public async Task<AppUsers?> GetUserByUsername(string username)
    {
        return await dataContext.Users
        .Include(x=>x.Photos)
        .SingleOrDefaultAsync(x=>x.UserName == username);
    }

    public async Task<IEnumerable<AppUsers>> GetUsersAsync()
    {
        return await dataContext.Users
        .Include(x=>x.Photos)
        .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await dataContext.SaveChangesAsync() >0;
    }

    public void Update(AppUsers users)
    {
        dataContext.Entry(users).State = EntityState.Modified;
    }
}
