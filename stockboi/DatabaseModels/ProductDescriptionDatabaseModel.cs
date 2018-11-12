using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("PRODUCT_DESCRIPTION")]
    public class ProductDescriptionDatabaseModel {
        [Key]
        [Column("UPC")]
        public int UPC { get; set; }
        [Column("Product_Description")]
        public string ProductDescription { get; set; }
        [Column("Product_Name")]
        public string ProductName { get; set; }
    }
}