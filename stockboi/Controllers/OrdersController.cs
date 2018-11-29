using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stockboi.Models;
using stockboi.RequestModels;
using System.Security.Principal;
using System.Security.Claims;
using stockboi.Helpers;
using Microsoft.AspNetCore.Http;
using stockboi.DatabaseModels;
using stockboi.Mappers;

namespace stockboi.Controllers
{
    [Route("api/[controller]/[action]")]
    public class OrdersController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public OrdersController(DatabaseContext ctx)
        {
            _databaseContext = ctx;
        }

        [HttpPost]
        public PagingResponse<Order> GetPastOrders([FromBody] PagingRequest request)
        {
            if (!PermissionHelper.IsAtLeastEmployee(HttpContext)){
                throw(new UnauthorizedAccessException());
            }
            var ordersDb = _databaseContext.PastOrders.ToList();
            var batches = _databaseContext.Batch.ToList();
            var orders = new List<Order>();
            foreach (var order in ordersDb)
            {
                var index = orders.FindIndex(x => x.OrderNumber == order.OrderID);
                if (index != -1)
                {
                    orders[index].Description += (", " + GetProductName(batches.Find(x => x.BatchNumber == order.Batch)));
                }
                else
                {
                    orders.Add(new Order
                    {
                        Description = GetProductName(batches.Find(x => x.BatchNumber == order.Batch)),
                        OrderNumber = order.OrderID,
                        DatePlaced = batches.Find(x => x.BatchNumber == order.Batch).DateReceived
                    });
                }
            }
            orders = orders.OrderByDescending(x => x.DatePlaced).ToList();
            var numberOfPages = orders.Count / request.NumberOfItemsPerPage;
            numberOfPages += (orders.Count % request.NumberOfItemsPerPage > 0) ? 1 : 0;
            return new PagingResponse<Order>
            {
                NumberOfPages = numberOfPages,
                Data = orders
            };
        }

        [HttpPost]
        public bool SaveOrder([FromBody] List<Batch> Order)
        {
            if (!PermissionHelper.IsAtLeastEmployee(HttpContext)){
                throw(new UnauthorizedAccessException());
            }
            try
            {
                _databaseContext.Batch.AddRange(BatchMapper.MapFrom(Order, _databaseContext));
                _databaseContext.SaveChanges();
                _databaseContext.PastOrders.AddRange(OrderMapper.MapFrom(Order, _databaseContext));
                _databaseContext.SaveChanges();
                return true;
            }
            catch(Exception e){
                throw(e);
            }
        }

        [HttpGet]
        public List<ProductDescriptionDatabaseModel> GetAllProductDescriptions()
        {
            if (!PermissionHelper.IsAtLeastEmployee(HttpContext)){
                throw(new UnauthorizedAccessException());
            }
            return _databaseContext.ProductDescription.ToList();
        }

        private string GetProductName(BatchDatabaseModel batch)
        {
            return _databaseContext.ProductDescription.Where(x => x.UPC == batch.UPC).ToList()[0].ProductName;
        }
    }
}
