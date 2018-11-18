using stockboi.Models;
using stockboi.DatabaseModels;
using stockboi.Mappers;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using stockboi.Enums;

namespace stockboi.Controllers
{

    [Route("api/[controller]")]
    public class StockAdminController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public StockAdminController(DatabaseContext ctx)
        {
            _databaseContext = ctx;
        }

        [HttpGet("[action]")]
        public List<ItemDescriptionWithItemType> GetAllItems()
        {
            var productDescriptions = _databaseContext.ProductDescription.ToList();
            var masterStock = _databaseContext.MasterStock.ToList();
            return ItemDescriptionMapper.MapTo(productDescriptions, masterStock, _databaseContext);
        }

        [HttpPost("[action]")]
        public bool AddItem([FromBody] ItemDescriptionWithItemType item)
        {
            try
            {
                var dbModels = ItemDescriptionMapper.MapFrom(item);
                dbModels.Item2.ItemId = 1;
                if (_databaseContext.MasterStock.ToList().Count > 0){
                    dbModels.Item2.ItemId = _databaseContext.MasterStock.Max(x => x.ItemId) + 1;
                }
                _databaseContext.ProductDescription.Add(dbModels.Item1);
                _databaseContext.MasterStock.Add(dbModels.Item2);
                AddToHeaderTable(item);
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        [HttpPost("[action]")]
        public bool EditItem([FromBody] ItemDescriptionWithItemType item)
        {
            try
            {
                var dbModels = ItemDescriptionMapper.MapFrom(item);
                _databaseContext.ProductDescription.Update(dbModels.Item1);
                _databaseContext.MasterStock.Update(dbModels.Item2);
                UpdateHeaderTable(item);
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        private void AddToHeaderTable(ItemDescriptionWithItemType item){
            if (item.ItemType == "Produce"){
                _databaseContext.Produce.Add(new ProduceDatabaseModel{
                    Price = item.Price,
                    UPC = item.UPC,
                    Description = item.ProductDescription,
                    Weight = 0
                });
            }
            else if (item.ItemType == "Perishable"){
                _databaseContext.PerishableItems.Add(new PerishableItemDatabaseModel{
                    Description = item.ProductDescription,
                    UPC = item.UPC,
                    Price = item.Price,
                    Units = 0
                });
            }
            else if (item.ItemType == "NonPerishable"){
                _databaseContext.NonPerishableItems.Add(new NonPerishableItemDatabaseModel{
                    Units = 0,
                    Price = item.Price,
                    UPC = item.UPC,
                    Description = item.ProductDescription
                });
            }
        }

        private void UpdateHeaderTable(ItemDescriptionWithItemType item)
        {
            var perishables = _databaseContext.PerishableItems.Where(x => x.UPC == item.UPC).ToList();
            var nonPerishables = _databaseContext.NonPerishableItems.Where(x => x.UPC == item.UPC).ToList();
            var produce = _databaseContext.Produce.Where(x => x.UPC == item.UPC).ToList();

            if (perishables.Count > 0)
            {
                perishables[0].Description = item.ProductDescription;
                perishables[0].Price = item.Price;
                _databaseContext.PerishableItems.Update(perishables[0]);
            }
            else if (nonPerishables.Count > 0)
            {
                nonPerishables[0].Description = item.ProductDescription;
                nonPerishables[0].Price = item.Price;
                _databaseContext.NonPerishableItems.Update(nonPerishables[0]);
            }
            else if (produce.Count > 0)
            {
                produce[0].Description = item.ProductDescription;
                produce[0].Price = item.Price;
                _databaseContext.Produce.Update(produce[0]);
            }
        }

    }
}