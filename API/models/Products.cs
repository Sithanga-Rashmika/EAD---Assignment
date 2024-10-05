using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Product
{
    [BsonId] // This attribute tells MongoDB that this property is the primary key
    public ObjectId Id { get; set; } // Change this to the appropriate type if necessary
   
    [BsonElement("product_id")]
    public string ProductID { get; set; }

    [BsonElement("vendor_id")]
    public string VendorID { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("category")]
    public string Category { get; set; }

    [BsonElement("price")]
    public double Price { get; set; }

    [BsonElement("stock_quantity")]
    public int StockQuantity { get; set; }
    
    public string? ImageUrl { get; set; }
}
