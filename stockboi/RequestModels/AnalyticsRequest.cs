using System;

namespace stockboi.RequestModels{
    public class AnalyticsRequest{
        public bool Acsending  { get; set; }
        public DateTime StartDate { get; set; } 
        public DateTime EndDate { get; set; }
        public int NumberOfItems { get; set; }
    }
}   