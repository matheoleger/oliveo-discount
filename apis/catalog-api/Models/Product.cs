using System.ComponentModel.DataAnnotations;

namespace catalog_api.Models;

public class Product 
{
    [Key] public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Stock { get; set; }
    public string CategoryId { get; set; } = string.Empty;
    public string? Description { get; set; }
    public float Price { get; set; }
    public float? DiscountPrice { get; set; }
    public float Rating { get; set; }
    public string SupplierId { get; set; } = string.Empty;

}