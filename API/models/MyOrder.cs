using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class MyOrder
{
    [BsonId] // This attribute tells MongoDB that this property is the primary key
    public ObjectId Id { get; set; } // Change this to the appropriate type if necessary

    [BsonElement("order_id")]
    public string OrderID { get; set; }

    [BsonElement("cartd_id")]
    public string CartID { get; set; }

    [BsonElement("product_id")]
    public string ProductID { get; set; }

    [BsonElement("product_name")]
    public string ProductName { get; set; }

    [BsonElement("user_id")]
    public string UserID { get; set; }

    [BsonElement("vendor_id")]
    public string VendorID { get; set; }

    [BsonElement("qunatity")]
    public int Quantity { get; set; }

    [BsonElement("price")]
    public double Price { get; set; }

    [BsonElement("status")]
    public string OrderStatus { get; set; }

    [BsonElement("date")]
    public DateTime OrderDate { get; set; }
    public string? ImageUrl { get; set; }
}
