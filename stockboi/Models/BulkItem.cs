using System;

namespace stockboi.Models
{
    public class BulkItem {
        public string Name {get; set;}
        public double Weight {get; set;}
        public double ExpiredWeight {get; set;}
        public double DamagedWeight {get; set;}
        public DateTime  ExpirationDate {get; set;}
        public decimal Price {get; set;}
    } 
}
