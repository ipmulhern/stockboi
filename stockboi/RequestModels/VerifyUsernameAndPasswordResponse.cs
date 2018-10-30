namespace stockboi.RequestModels
{
    public class VerifyUsernameAndPasswordResponse{
        public bool Valid { get; set; }
        public int PermissionLevel { get; set; }
    }
}