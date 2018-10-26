using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stockboi.Models;
using stockboi.DatabaseModels;
using stockboi.Mappers;

namespace stockboi.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {


        [HttpGet("[action]")]
        public List<PerishableItem> GetPerishableItems()
        {
            var databaseContext = new DatabaseContext();
            var perishableItemDatabaseModels = databaseContext.PerishableItems.ToList();
            var productDescriptionDatabaseModels = databaseContext.ProductDescription.ToList();
            var perishableItems = DatabaseModelToModelMapper.MapFrom(perishableItemDatabaseModels, productDescriptionDatabaseModels);

            return perishableItems;
        }


    }
}
