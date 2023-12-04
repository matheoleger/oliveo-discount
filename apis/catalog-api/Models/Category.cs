using System.Text.Json.Serialization;

namespace catalog_api.Models;

public class Category 
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
}