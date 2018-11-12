using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace stockboi.DatabaseModels {
    [Table("STOCK_NP")]
    public class NonPerishableItemDatabaseModel {
        [Key]
        [Column("UPC")]
        public int UPC { get; set; }
        public int Units { get; set; }
        [Column("Damaged_Units")]
        public int DamagedUnits { get; set; }
        public string Description { get; set; }
    }
}