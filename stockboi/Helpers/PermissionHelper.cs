using stockboi.Enums;
using stockboi.Models;
using stockboi.DatabaseModels;
using Microsoft.AspNetCore.Http;

namespace stockboi.Helpers{
    public static class PermissionHelper{
        public static bool IsAtLeastEmployee(HttpContext ctx){
            return IsEmployee(ctx) || IsAdmin(ctx) || IsManager(ctx);
        }
        public static bool IsAtLeastManager(HttpContext ctx){
            return IsAdmin(ctx) || IsManager(ctx);
        }
        public static bool IsEmployee(HttpContext ctx){
            var user = GetUser(ctx);
            return user.Username != "" && (AccessLevel)user.AccessLevel == AccessLevel.Employee;
        }
        public static bool IsManager(HttpContext ctx){
            var user = GetUser(ctx);
            return user.Username != "" && (AccessLevel)user.AccessLevel == AccessLevel.Manager;
        }
        public static bool IsAdmin(HttpContext ctx){
            var user = GetUser(ctx);
            return user.Username != "" && (AccessLevel)user.AccessLevel == AccessLevel.Admin;
        }

        private static UserInformationDatabaseModel GetUser(HttpContext ctx){
            var username = ctx.Session.GetString("Username");
            if (username != null && LoggedInUsers.UserLoggedIn(username)){
                return LoggedInUsers.GetUser(username);
            }
            else {
                return new UserInformationDatabaseModel{
                    Username = ""
                };
            }
        }
    }
}