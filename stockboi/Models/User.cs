using stockboi.Enums;

namespace stockboi.Models{
    public class User {
        public AccessLevel AccessLevel { get; set; }
        public string Username { get; set; }    
        public string Password { get; set; }    
        public string Name {get; set;}
        public int EmployeeId { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }

}