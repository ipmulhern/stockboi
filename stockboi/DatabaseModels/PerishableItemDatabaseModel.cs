using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("STOCK_P")]
    public class PerishableItemDatabaseModel {
        [Key]
        [Column("UPC")]
        public int UPC { get; set; }
        public int Units { get; set; }
        [Column("Damaged_Units")]
        public int DamagedUnits { get; set; }
        public string Description { get; set; }
        public DateTime Expiration { get; set; }
    }
}