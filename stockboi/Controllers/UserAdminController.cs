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
using stockboi.Helpers;

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