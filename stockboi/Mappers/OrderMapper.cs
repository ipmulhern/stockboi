using stockboi.DatabaseModels;
using stockboi.Models;
using System.Linq;
using System.Collections.Generic;
using stockboi.Enums;
using Microsoft.EntityFrameworkCore;

namespace stockboi.Mappers{
    public static class OrderMapper{
        public static PastOrdersDatabaseModel MapFrom(Batch batch, DatabaseContext ctx, int id){
            var dbBatch = ctx.Batch.Where(x => x.UPC == batch.UPC).ToList();
            dbBatch = dbBatch.Where(x => x.DateReceived == batch.DateReceived 
                && x.Expiration == batch.Expiration).ToList();

            return new PastOrdersDatabaseModel{
                Batch = dbBatch[0].BatchNumber,
                OrderID = id
            };
        }

        public static List<PastOrdersDatabaseModel> MapFrom(List<Batch> batches, DatabaseContext ctx){
            var pastOrdersDB = new List<PastOrdersDatabaseModel>();

            int id  = 1;
            if (ctx.PastOrders.ToList().Count > 0){
                id = ctx.PastOrders.Max(x => x.OrderID) + 1;
            }

            foreach(var batch in batches){
                pastOrdersDB.Add(MapFrom(batch, ctx, id));
            }
            return pastOrdersDB;
        }
    }
}