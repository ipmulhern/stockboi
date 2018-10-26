using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.DatabaseModels {
    [Table("PRODUCT_DESCRIPTION")]
    public class ProductDescriptionDatabaseModel {
        [Key]
        public int PLU { get; set; }
        [Column("Product Description")]
        public string ProductDescription { get; set; }
        [Column("Product Name")]
        public string ProductName { get; set; }
    }
}