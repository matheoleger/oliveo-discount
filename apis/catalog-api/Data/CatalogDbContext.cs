using catalog_api.Models;
using Microsoft.EntityFrameworkCore;

namespace catalog_api.Data;

public class CatalogDbContext: DbContext
{
    public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options)
    {
    }

    
    public DbSet<Product> Products { get; set; } = null!;
}
