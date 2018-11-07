using stockboi.Models;
using System.Collections.Generic;

namespace stockboi.Helpers {
    public static class LoggedInUsers{
        private static Dictionary<string, User> Users = new Dictionary<string, User>();
        public static void AddUser(User user){
            if (!Users.ContainsKey(user.Username)){
                 Users.Add(user.Username, user);
            }
        }

        public static void RemoveUser(string username){
            Users.Remove(username);
        }

        public static bool UserLoggedIn(User user){
            return Users.ContainsValue(user);
        }

         public static bool UserLoggedIn(string username){
            return Users.ContainsKey(username);
        }

        public static User GetUser(string username){
            return Users[username];
        }
    }
}