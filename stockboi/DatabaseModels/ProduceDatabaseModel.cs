using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("STOCK_PRODUCE")]
    public class ProduceDatabaseModel {
        [Key]
        public string UPC { get; set; }
        public double Weight { get; set; }
        public string Description { get; set; }
        [Column("Estimated Expiration")]
        public DateTime EstimatedExpiration { get; set; }
        public decimal Price {get; set;}
    }
}