using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stockboi.Models;
using stockboi.RequestModels;

namespace stockboi.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        

        [HttpPost("[action]")]
        public VerifyUsernameAndPasswordResponse VerifyUsernameAndPassword(
            [FromBody] UsernameAndPasswordRequest request){
            var valid = request.Username == "stockboi" && request.Password == "stockboi";
            return new VerifyUsernameAndPasswordResponse{
                Valid = valid,
                PermissionLevel = 0
            };
        }

       [HttpPost("[action]")]
        public VerifyUsernameAndPasswordResponse VerifyPin([FromBody] Request request){
            return new VerifyUsernameAndPasswordResponse{
                Valid = request.Keyword == "1234"
            };
        }
    }
}
