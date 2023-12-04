using catalog_api.Models;
using Microsoft.EntityFrameworkCore;

namespace catalog_api.Data;

public class CatalogDbContext: DbContext
{
    public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options)
    {
    }

    
    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;

    // protected override void OnModelCreating(ModelBuilder modelBuilder)
    // {
    //     modelBuilder.Entity<Category>()
    //         .HasMany(e => e.Products)
    //         .WithOne(e => e.Category)
    //         .HasForeignKey(e => e.CategoryId)
    //         .IsRequired();

    //     // modelBuilder.Entity<Product>()
    //     // .HasOne(e => e.Category)
    //     // .WithMany(e => e.Products)
    //     // .HasForeignKey(e => e.CategoryId)
    //     // .IsRequired();
    // }
}
