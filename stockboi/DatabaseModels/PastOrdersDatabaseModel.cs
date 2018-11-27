using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace stockboi.DatabaseModels {
    [Table("PAST_ORDERS")]
    public class PastOrdersDatabaseModel {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID {get; set;} 
        public int OrderID { get; set; }
        public int Batch { get; set; }
        public double Count { get; set; }
    }
}