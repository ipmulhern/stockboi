using Microsoft.EntityFrameworkCore;

namespace stockboi.DatabaseModels {
    public class DatabaseContext : DbContext {
        public DbSet<NonPerishableItemDatabaseModel> NonPerishableItems {get;set;}
        public DbSet<PerishableItemDatabaseModel> PerishableItems {get;set;}
        public DbSet<ProduceDatabaseModel> Produce {get;set;}
        public DbSet<BatchDatabaseModel> Batch {get;set;}
        public DbSet<MasterStockDatabaseModel> MasterStock {get;set;}
        public DbSet<ProductDescriptionDatabaseModel> ProductDescription {get;set;}
        public DbSet<UserInformationDatabaseModel> UserInformation {get;set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:stockboi.database.windows.net,1433;Initial Catalog=Stockboi;Persist Security Info=False;User ID=stockman;Password=Ferguson34;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
    }
}