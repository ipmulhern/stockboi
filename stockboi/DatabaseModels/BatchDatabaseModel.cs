using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("BATCH")]
    public class BatchDatabaseModel {
        [Key]
        [Column("Batch Number")]
        public int BatchNumber { get; set; }
        [Column("UPC")]
        public int UPC { get; set; }
        [Column("expiration")]
        public DateTime Expiration { get; set; }
        [Column("weight")]
        public double Weight { get; set; }
        [Column("Received")]
        public DateTime DateReceived { get; set; }
        public int Units { get; set; }
    }
}