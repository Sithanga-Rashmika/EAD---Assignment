using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Order
{
    [BsonId]
    public ObjectId Id { get; set; } // Order ID

    [BsonElement("customer_id")]
    public string CustomerID { get; set; }

    [BsonElement("product_id")]
    public string ProductID { get; set; }

    [BsonElement("quantity")]
    public int Quantity { get; set; }

    [BsonElement("status")]
    public string Status { get; set; } // "Purchased", "Delivered", etc.

    [BsonElement("purchase_date")]
    public DateTime PurchaseDate { get; set; }

    [BsonElement("delivery_date")]
    public DateTime? DeliveryDate { get; set; } // Optional, filled when delivered

    [BsonElement("vendor_id")]
    public string VendorID { get; set; }
}
