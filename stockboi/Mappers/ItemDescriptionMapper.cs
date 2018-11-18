using stockboi.Models;
using stockboi.DatabaseModels;
using stockboi.Enums;
using System.Collections.Generic;
using System;
using System.Linq;

namespace stockboi.Mappers
{
    public static class ItemDescriptionMapper
    {
        public static ItemDescriptionWithItemType MapTo(
        ProductDescriptionDatabaseModel productDescription,
        List<MasterStockDatabaseModel> masterStock, DatabaseContext ctx)
        {
            var masterStockDB = masterStock.Where(x => x.UPC == productDescription.UPC).ToList()[0];
            var itemType = ((ItemType)masterStockDB.ItemType).ToString("g");
            decimal price;
            if (itemType == "Produce")
                price = ctx.Produce.Where(x => x.UPC == productDescription.UPC).ToList()[0].Price;
            else if (itemType == "Perishable")
                price = ctx.PerishableItems.Where(x => x.UPC == productDescription.UPC).ToList()[0].Price;
            else 
                price = ctx.NonPerishableItems.Where(x => x.UPC == productDescription.UPC).ToList()[0].Price;


            return new ItemDescriptionWithItemType
            {
                ProductName = productDescription.ProductName,
                ProductDescription = productDescription.ProductDescription,
                UPC = productDescription.UPC,
                ItemType = itemType,
                ItemID = masterStockDB.ItemId,
                Price = price
            };
        }

        public static List<ItemDescriptionWithItemType> MapTo(
        List<ProductDescriptionDatabaseModel> productDescriptions,
        List<MasterStockDatabaseModel> masterStock, DatabaseContext ctx)
        {
            var itemDescriptionsWithItemTypes = new List<ItemDescriptionWithItemType>();
            foreach (var productDescription in productDescriptions)
            {
                itemDescriptionsWithItemTypes.Add(MapTo(productDescription, masterStock, ctx));
            }
            return itemDescriptionsWithItemTypes;
        }

        public static Tuple<ProductDescriptionDatabaseModel, MasterStockDatabaseModel> MapFrom(
            ItemDescriptionWithItemType item)
        {
            ItemType itemType;
            if (item.ItemType == "Produce" || item.ItemType == "Perishable")
            {
                itemType = item.ItemType == "Produce" ? ItemType.Produce : ItemType.Perishable;
            }
            else itemType = ItemType.NonPerishable;

            var productDescription = new ProductDescriptionDatabaseModel
            {
                ProductName = item.ProductName,
                ProductDescription = item.ProductDescription,
                UPC = item.UPC
            };
            var masterStock = new MasterStockDatabaseModel
            {
                UPC = item.UPC,
                ItemId = item.ItemID,
                ItemType = (int)itemType,
            };

            return new Tuple<ProductDescriptionDatabaseModel, MasterStockDatabaseModel>(productDescription, masterStock);
        }
    }
}