using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stockboi.Models;
using stockboi.RequestModels;
using System.Security.Principal;
using System.Security.Claims;
using stockboi.Helpers;
using Microsoft.AspNetCore.Http;

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
        public VerifyUsernameAndPasswordResponse VerifyPin([FromBody] VerifyPinRequest request){
            var valid = request.Pin == "1234";
            if (valid){
                LoginUser(request);
            }

            return new VerifyUsernameAndPasswordResponse{
                Valid = valid
            };
        }

        [HttpGet("[action]")]
        public bool Logout(){
            LoggedInUsers.RemoveUser(HttpContext.Session.GetString("Username"));
            return !LoggedInUsers.UserLoggedIn(HttpContext.Session.GetString("Username"));
        }

        [HttpGet("[action]")]
        public User GetUser() {
            var username = HttpContext.Session.GetString("Username");
            if (username != null && LoggedInUsers.UserLoggedIn(username)){
                return LoggedInUsers.GetUser(username);
            }
            return new User();
        }

        private void LoginUser(VerifyPinRequest request){
            //get user
            var user = new User();
            user.Username = request.Username;
            user.Password = request.Password;
            user.AccessLevel = 0;

            LoggedInUsers.AddUser(user);
            HttpContext.Session.SetString("Username", user.Username);
        }
    }
}
