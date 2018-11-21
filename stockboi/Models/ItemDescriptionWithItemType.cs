using stockboi.Enums;

namespace stockboi.Models{
    public class ItemDescriptionWithItemType{
        public int ItemID { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string UPC { get; set; }
        public string ItemType { get; set; }
    }
}