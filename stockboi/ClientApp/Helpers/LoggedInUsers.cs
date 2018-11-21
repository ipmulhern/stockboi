using stockboi.Models;
using stockboi.DatabaseModels;
using System.Collections.Generic;

namespace stockboi.Helpers {
    public static class LoggedInUsers{
        private static Dictionary<string, UserInformationDatabaseModel> Users 
            = new Dictionary<string, UserInformationDatabaseModel>();
        public static void AddUser(UserInformationDatabaseModel user){
            if (!Users.ContainsKey(user.Username)){
                 Users.Add(user.Username, user);
            }
        }

        public static void RemoveUser(string username){
            Users.Remove(username);
        }

        public static bool UserLoggedIn(UserInformationDatabaseModel user){
            return Users.ContainsValue(user);
        }

         public static bool UserLoggedIn(string username){
            return Users.ContainsKey(username);
        }

        public static UserInformationDatabaseModel GetUser(string username){
            return Users[username];
        }
    }
}