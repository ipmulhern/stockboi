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
        private readonly DatabaseContext _databaseContext;
        public SampleDataController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet("[action]")]
        public List<PerishableItem> GetPerishableItems()
        {
            var perishableItemDatabaseModels = _databaseContext.PerishableItems.ToList();
            var productDescriptionDatabaseModels = _databaseContext.ProductDescription.ToList();
            var perishableItems = DatabaseModelToModelMapper.MapFrom(perishableItemDatabaseModels, productDescriptionDatabaseModels);

            return perishableItems;
        }


    }
}
