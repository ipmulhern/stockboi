using stockboi.DatabaseModels;
using stockboi.Models;
using System.Collections.Generic;
using stockboi.Enums;
using System.Linq;

namespace stockboi.Mappers {
    public static class BatchMapper {
        public static Batch MapTo(BatchDatabaseModel Batch, List<ProductDescriptionDatabaseModel> ProductDescriptions){
            var name = "";
            var index = ProductDescriptions.FindIndex(x => x.UPC == Batch.UPC);
            if (index != -1) name = ProductDescriptions[index].ProductName;

            return new Batch(){
                UPC = Batch.UPC,
                DateReceived = Batch.DateReceived,
                ItemName = name,
                Damaged = Batch.Damaged,
                Units = Batch.Units,
                Expiration = Batch.Expiration,
                Weight = Batch.Weight
            };
        }   

        public static List<Batch> MapTo(List<BatchDatabaseModel> Batches, List<ProductDescriptionDatabaseModel> ProductDescriptions){
            var batches = new List<Batch>();
            foreach(var batch in Batches){
                batches.Add(MapTo(batch, ProductDescriptions));
            }
            return batches;
        }

        public static BatchDatabaseModel MapFrom(Batch batch, DatabaseContext ctx){
            return new BatchDatabaseModel{
                Damaged = batch.Damaged,
                DateReceived = batch.DateReceived,
                Weight = batch.Weight,
                UPC = batch.UPC,
                Expiration = batch.Expiration,
                Units = batch.Units,
                Price = GetPrice(batch, ctx)
            };
        }

        public static List<BatchDatabaseModel> MapFrom(List<Batch> batches, DatabaseContext ctx){
            var batchDBs = new List<BatchDatabaseModel>();
            foreach( var batch in batches){
                batchDBs.Add(MapFrom(batch, ctx));
            }
            return batchDBs;
        }

        private static decimal GetPrice(Batch batch, DatabaseContext ctx){
            var itemType = (ItemType)ctx.MasterStock.Where(x => x.UPC == batch.UPC).ToList()[0].ItemType;
            decimal price;
            if(itemType == ItemType.Produce){
                price = ctx.Produce.Where(x => x.UPC == batch.UPC).ToList()[0].Price;
            }
            else if(itemType == ItemType.Perishable){
                price = ctx.PerishableItems.Where(x => x.UPC == batch.UPC).ToList()[0].Price;
            }
            else if (itemType == ItemType.NonPerishable){
                price = ctx.NonPerishableItems.Where(x => x.UPC == batch.UPC).ToList()[0].Price; 
            }
            else{
                price = 0;
            }

            return price * (batch.Weight > (double)batch.Units ? (decimal)batch.Weight : (decimal)batch.Units);
        }
    }
}

