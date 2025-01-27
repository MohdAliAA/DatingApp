using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController(DataContext dataContext ) : ControllerBase
    {
        [Authorize]
        [HttpGet ("auth")]
        public ActionResult<string> GetAuth()
        {
            return "secret text";

        }

        [HttpGet ("not-found")]
        public ActionResult<AppUsers> GetNotFound()
        {
            var thing = dataContext.Users.Find(-1);

            if(thing == null)
            {
                return NotFound();
            }
            return thing;

        }

        [HttpGet ("server-error")]
        public ActionResult<AppUsers> GetServerError()
        {
            var thing = dataContext.Users.Find(-1) ?? throw new Exception("Has bad thing happned");
            
            return thing;

        }

        [HttpGet ("bad-request")]
        public ActionResult<AppUsers> GetBadRequest()
        {
           
            return BadRequest("this was not a good request");
        }
    }
}
