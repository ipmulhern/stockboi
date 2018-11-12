using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("STOCK_PRODUCE")]
    public class ProduceDatabaseModel {
        [Key]
        public int PLU { get; set; }
        public float Weight { get; set; }
        [Column("Damaged Weight")]
        public float DamagedWeight { get; set; }
        public string Description { get; set; }
        [Column("Estimated Expiration")]
        public DateTime EstimatedExpiration { get; set; }
    }
}