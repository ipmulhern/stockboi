using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("PAST_ORDERS")]
    public class PastOrdersDatabaseModel {
        [Key]
        public int OrderId { get; set; }
        public int Batch { get; set; }
    }
}