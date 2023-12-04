using System.Text.Json.Serialization;

namespace catalog_api.Models;

public class Product 
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ImagePath { get; set; } = string.Empty;
    public int Stock { get; set; }   

    public Guid CategoryId { get; set; }   

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public virtual Category? Category { get; set; }

    public string? Description { get; set; }
    public float Price { get; set; }
    public float? DiscountPrice { get; set; }
    public float Rating { get; set; }
    public Guid SupplierId { get; set; }
}