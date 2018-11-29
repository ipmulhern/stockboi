using stockboi.Models;
using stockboi.DatabaseModels;
using stockboi.Mappers;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using System;
using stockboi.RequestModels;
using stockboi.Enums;
using stockboi.Helpers;

namespace stockboi.Controllers
{
    [Route("api/[controller]")]
    public class UserAdminController : Controller
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IHttpClientFactory _clientFactory;

        public UserAdminController(DatabaseContext ctx, IHttpClientFactory httpClientFactory)
        {
            _databaseContext = ctx;
            _clientFactory = httpClientFactory;
        }

        [HttpGet("[action]")]
        public List<User> GetAllUsers(){
            if (!PermissionHelper.IsAtLeastManager(HttpContext)){
                throw(new UnauthorizedAccessException());
            }
            return  UserMapper.MapTo(_databaseContext.UserInformation.ToList());
        }

        [HttpPost("[action]")]
        public bool AddUser([FromBody] User user)
        {
            if (!PermissionHelper.IsAtLeastManager(HttpContext)){
                throw(new UnauthorizedAccessException());
            }
            try
            {
                user.EmployeeId = GetEmployeeId();
                
                var requestContent = new FormUrlEncodedContent(new [] {
                    new KeyValuePair<string, string>("user[email]", user.Email),
                    new KeyValuePair<string, string>("user[cellphone]", user.PhoneNumber),
                    new KeyValuePair<string, string>("user[country_code]", "1"),
                    new KeyValuePair<string, string>("send_install_link_via_sms", "true")
                });
                
                var httpRequest = new HttpRequestMessage(HttpMethod.Post, "users/new") {
                    Content = requestContent
                };
                var result = Send<UserRegistrationResponse>(httpRequest).Result;
                _databaseContext.UserInformation.Add(UserMapper.MapFrom(user, result));
                _databaseContext.SaveChanges();
                return true;
            }
            catch(Exception e){
                throw(e);
            }
        }

        [HttpPost("[action]")]
        public bool SaveUser([FromBody] User user)
        {
            if (!PermissionHelper.IsAtLeastManager(HttpContext)){
                throw(new UnauthorizedAccessException());
            }
            try
            {
                _databaseContext.UserInformation.Update(UserMapper.MapFrom(user));
                _databaseContext.SaveChanges();
                return true;
            }
            catch(Exception e){
                throw(e);
            }
        }

        [HttpPost("[action]")]
        public bool RemoveUser([FromBody] User user)
        {
            if (!PermissionHelper.IsAtLeastManager(HttpContext)){
                throw(new UnauthorizedAccessException());
            }
            try
            {
                var userToRemove = _databaseContext.UserInformation.Single(x => x.Username == user.Username);
                var request = new HttpRequestMessage(HttpMethod.Post, "users/" + userToRemove.AuthyId + "/remove");
                var result = Send<UserRemovalResponse>(request).Result;
                _databaseContext.UserInformation.Remove(userToRemove);
                _databaseContext.SaveChanges();
                return true;
            }
            catch(Exception e){
                throw(e);
            }
        }

        private async Task<T> Send<T>(HttpRequestMessage requestMessage) {
             var client = _clientFactory.CreateClient("authy");
             var httpResponse = await client.SendAsync(requestMessage);

            var result = await httpResponse.Content.ReadAsAsync<T>();
            return result;
        }

        private int GetEmployeeId(){
            return _databaseContext.UserInformation.Max(x => x.EmployeeId) + 1;
        }
    }
}