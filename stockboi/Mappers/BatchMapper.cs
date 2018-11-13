using stockboi.DatabaseModels;
using stockboi.Models;
using System.Collections.Generic;

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
    }
}

