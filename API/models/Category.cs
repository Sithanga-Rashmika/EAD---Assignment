using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Category
{
    [BsonId] // This attribute tells MongoDB that this property is the primary key
    public ObjectId Id { get; set; } // Change this to the appropriate type if necessary
   
    [BsonElement("categoy_id")]
    public string CategoryID { get; set; }

    [BsonElement("category_name")]
    public string CategoryName { get; set; }

    [BsonElement("status")]
    public bool CategoryStatus { get; set; }
}
