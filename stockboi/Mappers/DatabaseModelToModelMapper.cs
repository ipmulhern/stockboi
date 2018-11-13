using System.Collections.Generic;
using stockboi.DatabaseModels;
using stockboi.Models;
using System.Linq;
using System;

namespace stockboi.Mappers
{
    public static class DatabaseModelToModelMapper
    {
        public static List<PerishableItem> MapFrom(List<PerishableItemDatabaseModel> databaseModels, List<ProductDescriptionDatabaseModel> productDescriptionDatabaseModels, List<BatchDatabaseModel> batchDatabaseModels)
        {
            var perishableItems = new List<PerishableItem>();
            foreach (var databaseModel in databaseModels)
            {
                var expiredItemCount = CalculateExpiredItemCount(batchDatabaseModels, databaseModel.UPC);
                perishableItems.Add(MapFrom(databaseModel, productDescriptionDatabaseModels, expiredItemCount));
            }

            return perishableItems;
        }

        public static PerishableItem MapFrom(PerishableItemDatabaseModel databaseModel, List<ProductDescriptionDatabaseModel> productDescriptionDatabaseModels, double expiredItemCount)
        {
            var productDescription = productDescriptionDatabaseModels.SingleOrDefault(x => x.UPC == databaseModel.UPC);

            return new PerishableItem
            {
                Name = productDescription != null ? productDescription.ProductName : "Invalid Product",
                Count = databaseModel.Units,
                Damaged = 5,
                ExpiredCount = expiredItemCount
            };
        }

        private static double CalculateExpiredItemCount(List<BatchDatabaseModel> batchDatabaseModels, int UPC)
        {
            var counts = batchDatabaseModels.Where(x => x.Expiration.CompareTo(DateTime.UtcNow) < 0 && x.UPC == UPC).Select(x => x.Units).ToList();
            var total_count = counts.Sum();
            return total_count;
        }
    }
}