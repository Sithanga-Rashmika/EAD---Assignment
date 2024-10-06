using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class ARole
{
    [BsonId] // This attribute tells MongoDB that this property is the primary key
    public ObjectId Id { get; set; } // Change this to the appropriate type if necessary
   
    [BsonElement("ar_id")]
    public string ARoleID { get; set; }

    [BsonElement("ar_email")]
    public string ARoleEmail { get; set; }

    [BsonElement("ar_name")]
    public string ARName { get; set; }

    [BsonElement("ar_number")]
    public string ARNumber { get; set; }

    [BsonElement("ar_password")]
    public string ARolePasswrod { get; set; }

    [BsonElement("ar_type")]
    public string ARoleTyoe { get; set; }

}
