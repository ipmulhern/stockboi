using System.Collections.Generic;

namespace stockboi.Models{
    public class AuthySMSSendResponse {
        public string Message { get; set; }
        public string Cellphone { get; set; }
        public bool Success { get; set; }
        public string Device { get; set; }
        public bool Ignored { get; set; }
    }

    public class AuthyPinVerificationResponse {
        public string Message { get; set; }
        public string Token { get; set; }
        public bool Success { get; set; }
        public AuthyDevice Device { get; set; }
    }

    public class AuthyDevice {
        public string City { get; set; }
        public string Country { get; set; }
        public string IP { get; set; }
        public string Region { get; set; }
        public string Registration_City { get; set; }
        public string Registration_Country { get; set; }
        public string Registration_IP { get; set; }
        public string Registration_Method { get; set; }
        public string Registration_Region { get; set; }
        public string OS_Type { get; set; }
        public string Last_Account_Recovery_At { get; set; }
        public string Id { get; set; }
        public string Registration_Date { get; set; }
    }

    public class UserRegistrationResponse {
        public Dictionary<string,int> User { get; set; }
        public UserRegistrationError Errors { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; }
    }

    public class UserRegistrationError {
        public string Email { get; set; }
        public string Cellphone { get; set; }
    }

    public class UserRemovalResponse {
        public string Message { get; set; }
        public bool Success { get; set; }
    }
}