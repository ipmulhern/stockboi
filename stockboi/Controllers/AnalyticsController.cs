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
    [Route("api/[controller]")]
    public class AnalyticsController : Controller
    {
        private readonly DatabaseContext _databaseContext;
        public AnalyticsController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpPost("[action]")]
        public ItemExpiredRatio GetAllItemsExpiredRatio(AnalyticsRequest request)
        {
            var allItemsExpiredRatio = new ItemExpiredRatio
            {
                Purchased = 0,
                Damaged = 0,
                Expired = 0
            };
            _databaseContext.PastOrders.ToList().ForEach(pastOrder =>
            {
                var batch = _databaseContext.Batch.Where(x => x.BatchNumber == pastOrder.Batch).First(); allItemsExpiredRatio.Damaged += batch.Damaged;
                allItemsExpiredRatio.Purchased += (pastOrder.Count - ((double)batch.Units > batch.Weight ? (double)batch.Units : batch.Weight));
                if (batch.Expiration < DateTime.Today)
                {
                    allItemsExpiredRatio.Expired += ((double)batch.Units > batch.Weight ? (double)batch.Units : batch.Weight);
                }
            });
            return allItemsExpiredRatio;
        }

        [HttpPost("[action]")]
        public List<ItemExpiredRatio> GetPercentageExpired(AnalyticsRequest request)
        {
            var items = new List<ItemExpiredRatio>();
            _databaseContext.ProductDescription.ToList().ForEach(product =>
            {
                var item = new ItemExpiredRatio { Name = product.ProductName };
                _databaseContext.Batch
                    .Where(x => x.UPC == product.UPC)
                    .ToList().ForEach(batch =>
                {
                    var order = _databaseContext.PastOrders.Where(x => x.Batch == batch.BatchNumber).First();
                    item.Purchased += (order.Count - ((double)batch.Units > batch.Weight ? (double)batch.Units : batch.Weight));
                    if (batch.Expiration < DateTime.Today)
                    {
                        item.Expired += ((double)batch.Units > batch.Weight ? (double)batch.Units : batch.Weight);
                    }
                });
                if (item.Expired > 0 || item.Purchased > 0)
                {
                    var expired = item.Expired;
                    var purchased = item.Purchased;
                    item.Expired = (expired / (expired + purchased)) * 100;
                    item.Purchased = (purchased / (expired + purchased)) * 100;
                    items.Add(item);
                }

            });
            items = request.Acsending
                ? items.OrderBy(x => x.Expired).ToList()
                : items.OrderByDescending(x => x.Expired).ToList();
            items = items.Take(5).ToList();

            return items;
        }
    }
}
