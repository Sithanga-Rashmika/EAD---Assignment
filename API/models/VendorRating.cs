using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class VendorRating
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("vendor_id")]
    public string VendorID { get; set; }

    [BsonElement("customer_id")]
    public string CustomerEmail { get; set; }

    [BsonElement("rating")]
    public int Rating { get; set; } // Rating from 1 to 5

    [BsonElement("comment")]
    public string Comment { get; set; }

    [BsonElement("date")]
    public DateTime Date { get; set; }
}
