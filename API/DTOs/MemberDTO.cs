using System;

namespace API.DTOs;

public class MemberDTO
{
    public int Id {get; set;}
    public string? Username { get; set; }
    public int Age { get; set; }
    public string? PhotoURL { get; set; }
    public string? KnownAs { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime LastActive { get; set; }
    public string? gender {get; set;}
    public string? Introduction { get; set; }
    public string? Interests { get; set; }
    public string? LookingFor { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public List<PhotosDTO>? Photos {get; set;} 
}
