using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("MASTER_STOCK")]
    public class MasterStockDatabaseModel {
        [Column("itemId")]
        public int ItemId { get; set; }
        [Column("UPC")]
        public int UPC { get; set; }
        [Column("Item_Type")]
        public int ItemType { get; set; }
    }
}