using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("USER_INFORMATION")]
    public class UserInformationDatabaseModel {
        [Key]
        public string Username { get; set; }
        public string Password { get; set; }
        [Column("Access Level")]
        public int AccessLevel { get; set; }
        public string Name { get; set; }
        [Column("Employee ID Number")]
        public int EmployeeId { get; set; }
        public int AuthyId {get;set;}
    }
}