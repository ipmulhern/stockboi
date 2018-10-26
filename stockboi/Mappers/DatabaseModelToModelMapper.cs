using System.Collections.Generic;
using stockboi.DatabaseModels;
using stockboi.Models;
using System.Linq;

namespace stockboi.Mappers {
    public static class DatabaseModelToModelMapper {
        public static List<PerishableItem> MapFrom(List<PerishableItemDatabaseModel> databaseModels, List<ProductDescriptionDatabaseModel> productDescriptionDatabaseModels) {
            var perishableItems = new List<PerishableItem>();
            foreach (var databaseModel in databaseModels) {
                perishableItems.Add(MapFrom(databaseModel, productDescriptionDatabaseModels));
            }

            return perishableItems;
        }

        public static PerishableItem MapFrom(PerishableItemDatabaseModel databaseModel, List<ProductDescriptionDatabaseModel> productDescriptionDatabaseModels) {
            var productDescription = productDescriptionDatabaseModels.SingleOrDefault(x => x.PLU == databaseModel.PLU);
            
            return new PerishableItem {
                Name = productDescription != null ? productDescription.ProductName : "Invalid Product",
                Count = databaseModel.Units,
                Damaged = databaseModel.DamagedUnits,
                Price = databaseModel.Price
            };
        }
    }
}