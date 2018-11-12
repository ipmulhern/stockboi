using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("BATCH")]
    public class BatchDatabaseModel {
        [Key]
        [Column("Batch Number")]
        public int BatchNumber { get; set; }
        [Column("PLU Number")]
        public int UPC { get; set; }
        public DateTime Expiration { get; set; }
        public double Weight { get; set; }
        [Column("Date Received")]
        public DateTime DateReceived { get; set; }
        public int Units { get; set; }
    }
}