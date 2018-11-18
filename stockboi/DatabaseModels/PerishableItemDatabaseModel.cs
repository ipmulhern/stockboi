using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("STOCK_P")]
    public class PerishableItemDatabaseModel {
        [Key]
        [Column("UPC")]
        public string UPC { get; set; }
        public int Units { get; set; }
        public string Description { get; set; }
        public DateTime Expiration { get; set; }
        public decimal Price {get; set;}
    }
}