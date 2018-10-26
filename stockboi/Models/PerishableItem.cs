using System;

namespace stockboi.Models
{
    public class PerishableItem {
        public string Name {get; set;}
        public double Count {get; set;}
        public double Damaged {get; set;}
        public decimal Price { get; set; }        
    } 
}