using System;
using API.Entities;

namespace API.Interface;

public interface ITokenServices
{
    string CreateToken(AppUsers user);
}
