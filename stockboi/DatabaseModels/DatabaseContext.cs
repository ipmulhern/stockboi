using Microsoft.EntityFrameworkCore;

namespace stockboi.DatabaseModels {
    public class DatabaseContext : DbContext {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<NonPerishableItemDatabaseModel> NonPerishableItems {get;set;}
        public DbSet<PerishableItemDatabaseModel> PerishableItems {get;set;}
        public DbSet<ProduceDatabaseModel> Produce {get;set;}
        public DbSet<BatchDatabaseModel> Batch {get;set;}
        public DbSet<MasterStockDatabaseModel> MasterStock {get;set;}
        public DbSet<ProductDescriptionDatabaseModel> ProductDescription {get;set;}
        public DbSet<UserInformationDatabaseModel> UserInformation {get;set;}
        public DbSet<PastOrdersDatabaseModel> PastOrders { get; set; }
    }
}