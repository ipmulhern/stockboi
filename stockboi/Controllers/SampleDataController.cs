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
using stockboi.RequestModels;

namespace stockboi.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PerishableItemController : Controller
    {
        private readonly DatabaseContext _databaseContext;
        public PerishableItemController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet]
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

        [HttpPost]
        public PagingResponse<Batch> GetAllItems([FromBody] PagingRequest request){
            if (!PermissionHelper.IsAtLeastEmployee(HttpContext)){
                throw(new UnauthorizedAccessException());
            }
            var itemDescriptions = _databaseContext.ProductDescription.ToList();
            var batchDatabaseModels = _databaseContext.Batch.ToList();
            var batches = BatchMapper.MapTo(batchDatabaseModels, itemDescriptions);
            if (request.SortBy != "Count"){
                batches = batches.OrderBy(x => typeof(Batch).GetProperty(request.SortBy).GetValue(x)).ToList();
            }
            else {
                batches = batches.OrderBy(x => x.Units).ToList();
            }
            var response = new PagingResponse<Batch>();

            response.NumberOfPages = batches.Count / request.NumberOfItemsPerPage;
            if (batches.Count % request.NumberOfItemsPerPage != 0) response.NumberOfPages += 1;
            
            var startingIndex = request.NumberOfItemsPerPage * (request.PageSelected - 1);
            response.Data = batches.GetRange(
                startingIndex,
                request.NumberOfItemsPerPage + startingIndex < batches.Count 
                    ? request.NumberOfItemsPerPage : batches.Count - startingIndex);
            return response;
        }
    }
}
