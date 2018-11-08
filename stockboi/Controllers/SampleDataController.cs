using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using stockboi.Models;
using stockboi.DatabaseModels;
using stockboi.Mappers;
using stockboi.Helpers;

namespace stockboi.Controllers
{
    [Route("api/[controller]")]
    public class PerishableItemController : Controller
    {
        private readonly DatabaseContext _databaseContext;
        public PerishableItemController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet("[action]")]
        public List<PerishableItem> GetPerishableItems()
        {
            if (!LoggedInUsers.UserLoggedIn(HttpContext.Session.GetString("Username"))){
                return new List<PerishableItem>();
           }

            var perishableItemDatabaseModels = _databaseContext.PerishableItems.ToList();
            var productDescriptionDatabaseModels = _databaseContext.ProductDescription.ToList();
            var batchDatabaseModels = _databaseContext.Batch.ToList();
            var perishableItems = DatabaseModelToModelMapper.MapFrom(perishableItemDatabaseModels, productDescriptionDatabaseModels, batchDatabaseModels);
            return perishableItems;
        }
    }
}
