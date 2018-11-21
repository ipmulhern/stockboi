using System.Linq;
using Microsoft.AspNetCore.Mvc;
using stockboi.Models;
using stockboi.DatabaseModels;
using stockboi.RequestModels;
using stockboi.Helpers;
using Microsoft.AspNetCore.Http;

namespace stockboi.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public LoginController(DatabaseContext databaseContext){
            _databaseContext = databaseContext;
        }

        [HttpPost("[action]")]
        public VerifyUsernameAndPasswordResponse VerifyUsernameAndPassword(
            [FromBody] UsernameAndPasswordRequest request){
            var users = _databaseContext.UserInformation.Where(x => x.Username ==request.Username).ToList();
            var valid = users.Count > 0 ? users[0].Password == request.Password : false;
            return new VerifyUsernameAndPasswordResponse{
                Valid = valid,
                PermissionLevel = users.Count > 0 ? users[0].AccessLevel : 2
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
        public UserInformationDatabaseModel GetUser() {
            var username = HttpContext.Session.GetString("Username");
            if (username != null && LoggedInUsers.UserLoggedIn(username)){
                return LoggedInUsers.GetUser(username);
            }
            return new UserInformationDatabaseModel();
        }

        private void LoginUser(VerifyPinRequest request){
            var users = _databaseContext.UserInformation.Where(x =>
                x.Username == request.Username && x.Password == request.Password
            ).ToList();
            if (users.Count > 0){
                var user = users[0];
                LoggedInUsers.AddUser(user);
                HttpContext.Session.SetString("Username", user.Username);
            }   
        }
    }
}
