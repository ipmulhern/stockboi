using stockboi.Models;
using stockboi.DatabaseModels;
using stockboi.Enums;
using System.Collections.Generic;

namespace stockboi.Mappers{
    public static class UserMapper{
        public static User MapTo(UserInformationDatabaseModel userDB){
            return new User{
                AccessLevel = (AccessLevel)userDB.AccessLevel,
                Username = userDB.Username,
                Password = userDB.Password,
                Name = userDB.Name,
                EmployeeId = userDB.EmployeeId
            };
        }

        public static List<User> MapTo(List<UserInformationDatabaseModel> userDBs){
            var users = new List<User>();
            foreach(var userDB in userDBs){
                users.Add(MapTo(userDB));
            }
            return users;
        }

        public static UserInformationDatabaseModel MapFrom(User user, UserRegistrationResponse userRegistration) {
            var userInfo = MapFrom(user);
            
            return userInfo;
        }

        public static UserInformationDatabaseModel MapFrom(User user){
            return new UserInformationDatabaseModel{
                AccessLevel = (int)user.AccessLevel,
                Username = user.Username,
                Password = user.Password,
                Name = user.Name,
                EmployeeId = user.EmployeeId
            };
        }

        public static List<UserInformationDatabaseModel> MapFrom(List<User> users){
            var userDBs = new List<UserInformationDatabaseModel>();
            foreach(var user in users){
                userDBs.Add(MapFrom(user));
            }
            return userDBs;
        }
    }
}