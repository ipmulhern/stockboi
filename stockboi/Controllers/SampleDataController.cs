using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stockboi.Models;

namespace stockboi.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        

        [HttpGet("[action]")]
        public List<PerishableItem> GetPerishableItems()
        {
           var itemList = new List<PerishableItem>();
           itemList.Add(
            new PerishableItem {
                Name = "Milk Gallons",
                Count = 75,
                Damaged = 3,
                ExpirationDate = new DateTime(2018, 10, 20)
            }
           );

           itemList.Add(
            new PerishableItem {
                Name = "Milk Gallons",
                Count = 10,
                Damaged = 3,
                ExpirationDate = new DateTime(2018, 10, 1)
            }
           );
           itemList.Add(
            new PerishableItem {
                Name = "Sour Cream 16 oz",
                Count = 75,
                Damaged = 3,
                ExpirationDate = new DateTime(2018, 10, 20)
            }
           );
           itemList.Add(
            new PerishableItem {
                Name = "Sour Cream 8 oz",
                Count = 16,
                Damaged = 8,
                ExpirationDate = new DateTime(2018, 10, 9)
            }
           );

           return itemList;
        }

       
    }
}
