using System.Linq;
using Microsoft.AspNetCore.Mvc;
using stockboi.Models;
using stockboi.DatabaseModels;
using stockboi.RequestModels;
using stockboi.Helpers;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using System.Threading.Tasks;

namespace stockboi.Controllers
{
    [Route("api/[controller]/[action]")]
    public class LoginController : Controller
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IHttpClientFactory _clientFactory;

        public LoginController(DatabaseContext databaseContext, IHttpClientFactory httpClientFactory){
            _databaseContext = databaseContext;
            _clientFactory = httpClientFactory;
        }

        [HttpPost]
        public VerifyUsernameAndPasswordResponse VerifyUsernameAndPassword(
            [FromBody] UsernameAndPasswordRequest request){
            var users = _databaseContext.UserInformation.Where(x => x.Username ==request.Username).ToList();
            var valid = users.Count > 0 ? users[0].Password == request.Password : false;
            
            if (valid) {
                var authyId = users[0].AuthyId;
                var httpRequest = new HttpRequestMessage(HttpMethod.Get, "sms/" + authyId);
                var result = Send<AuthySMSSendResponse>(httpRequest).Result;
            }
            return new VerifyUsernameAndPasswordResponse{
                Valid = valid,
                PermissionLevel = users.Count > 0 ? users[0].AccessLevel : 2
            };
        }

       [HttpPost]
        public VerifyUsernameAndPasswordResponse VerifyPin([FromBody] VerifyPinRequest request){
            var authyId = _databaseContext.UserInformation.Single(x => x.Username ==request.Username).AuthyId;
            var httpRequest = new HttpRequestMessage(HttpMethod.Get, "verify/" + int.Parse(request.Pin) + "/" + authyId);
            var result = Send<AuthyPinVerificationResponse>(httpRequest).Result;
            
            if (result.Success){
                LoginUser(request);
            }

            return new VerifyUsernameAndPasswordResponse{
                Valid = result.Success
            };
        }

        [HttpGet]
        public bool Logout(){
            LoggedInUsers.RemoveUser(HttpContext.Session.GetString("Username"));
            return !LoggedInUsers.UserLoggedIn(HttpContext.Session.GetString("Username"));
        }

        [HttpGet]
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

        private async Task<T> Send<T>(HttpRequestMessage requestMessage) {
             var client = _clientFactory.CreateClient("authy");
             var httpResponse = await client.SendAsync(requestMessage);

            var result = await httpResponse.Content.ReadAsAsync<T>();
            return result;
        }
    }
}
