using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("MASTER_STOCK")]
    public class MasterStockDatabaseModel {
        public int ItemId { get; set; }
        [Column("PLU")]
        public int UPC { get; set; }
    }
}