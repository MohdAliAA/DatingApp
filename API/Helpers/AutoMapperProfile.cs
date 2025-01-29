using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<AppUsers , MemberDTO>()
        .ForMember(d=>d.Age, o=>o.MapFrom(s=>s.DateOfBirth.CalculateAge()))
        .ForMember(d=>d.PhotoURL, o=>o.MapFrom(s=>s.Photos.FirstOrDefault(x=>x.IsMain)!.Url));
        CreateMap<Photos , PhotosDTO>();
    }

}
