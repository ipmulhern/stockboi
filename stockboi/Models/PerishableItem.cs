using System;

namespace stockboi.Models
{
    public class PerishableItem {
        public string Name {get; set;}
        public double Count {get; set;}
        public double Expired {get; set;}
        public double Damaged {get; set;}
        public DateTime  ExpirationDate {get; set;}
    } 
}