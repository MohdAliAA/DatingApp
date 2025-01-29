using System;
using API.DTOs;
using API.Entities;

namespace API.Interface;

public interface IUserRepository
{
    void Update(AppUsers users);

    Task<bool> SaveAllAsync();
    Task<IEnumerable<AppUsers>>GetUsersAsync();
    Task<AppUsers?> GetUserByIdAsync(int id);
    Task<AppUsers?> GetUserByUsername(string username);

    Task<IEnumerable<MemberDTO>>GetMembersAsync();
    Task<MemberDTO?> GetMemberAsync(string username);
 }   
