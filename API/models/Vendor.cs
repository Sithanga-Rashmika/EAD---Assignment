using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Vendor
{
    [BsonId] // This attribute tells MongoDB that this property is the primary key
    public ObjectId Id { get; set; } // Change this to the appropriate type if necessary
   
    [BsonElement("vendor_id")]
    public string VendorID { get; set; }

    [BsonElement("vendor_name")]
    public string VendorName { get; set; }

    [BsonElement("vendor_email")]
    public string VendorEmail { get; set; }

    [BsonElement("password")]
    public string VendorPassword { get; set; }

    [BsonElement("rating")]
    public double Rateing { get; set; }
}
