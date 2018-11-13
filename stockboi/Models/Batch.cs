using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace stockboi.Models{
    public class Batch {
        public string ItemName { get; set; }
        public int UPC { get; set; }
        public int Units { get; set; }
        public double Weight { get; set; }
        public DateTime Expiration { get; set; }
        public DateTime DateReceived { get; set; }
        public double Damaged { get; set; }

    }
}