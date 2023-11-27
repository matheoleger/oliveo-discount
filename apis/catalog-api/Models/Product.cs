using System.ComponentModel.DataAnnotations;

namespace catalog_api.Models;

public class Product 
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Stock { get; set; }
    public Guid CategoryId { get; set; }
    public string? Description { get; set; }
    public float Price { get; set; }
    public float? DiscountPrice { get; set; }
    public float Rating { get; set; }
    public Guid SupplierId { get; set; }
}