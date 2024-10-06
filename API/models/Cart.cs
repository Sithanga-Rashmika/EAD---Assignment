using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
public class Cart
{
    [BsonId]
    public ObjectId Id { get; set; }
    [BsonElement("CartID")]
    public string CartID { get; set; }
    [BsonElement("CustomerID")]
    public string CustomerID { get; set; }
    [BsonElement("ProductID")]
    public string ProductID { get; set; }
    [BsonElement("Quantity")]
    public int Quantity { get; set; }
    [BsonElement("VendorID")]
    public string VendorID { get; set; }
    [BsonElement("ProductName")]
    public string ProductName { get; set; }
    [BsonElement("Price")]
    public double Price { get; set; }
    [BsonElement("Status")]
    public string Status { get; set; }

    [BsonElement("date")]
    public DateTime Date { get; set; }

}
