using stockboi.Models;
using stockboi.DatabaseModels;
using stockboi.Mappers;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using stockboi.RequestModels;
using stockboi.Enums;

namespace stockboi.Controllers
{
    [Route("api/[controller]")]
    public class UserAdminController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public UserAdminController(DatabaseContext ctx)
        {
            _databaseContext = ctx;
        }

        [HttpGet("[action]")]
        public List<User> GetAllUsers(){
            return  UserMapper.MapTo(_databaseContext.UserInformation.ToList());
        }

        [HttpPost("[action]")]
        public bool AddUser([FromBody] User user)
        {
            try
            {
                user.EmployeeId = GetEmployeeId();
                _databaseContext.UserInformation.Add(UserMapper.MapFrom(user));
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
            try
            {
                _databaseContext.UserInformation.Remove(UserMapper.MapFrom(user));
                _databaseContext.SaveChanges();
                return true;
            }
            catch(Exception e){
                throw(e);
            }
        }

        private int GetEmployeeId(){
            return _databaseContext.UserInformation.Max(x => x.EmployeeId) + 1;
        }
    }
}