using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace stockboi.DatabaseModels {
    [Table("STOCK_NP")]
    public class NonPerishableItemDatabaseModel {
        [Key]
        public int PLU { get; set; }
        public int Units { get; set; }
        [Column("Damaged Units")]
        public int DamagedUnits { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}