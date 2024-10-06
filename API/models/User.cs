using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User
{
    [BsonId] // This attribute tells MongoDB that this property is the primary key
    public ObjectId Id { get; set; } // Change this to the appropriate type if necessary

    [BsonElement("email")]
    public string Email { get; set; }

    [BsonElement("password")]
    public string Password { get; set; }

    [BsonElement("contact")]
    public string Contact { get; set; }

    [BsonElement("address")]
    public string Address { get; set; }

    [BsonElement("gender")]
    public string Gender { get; set; }

    [BsonElement("isActive")]
    public bool IsActive { get; set; }

    [BsonElement("isDeactivatedByCSR")]
    public bool IsDeactivatedByCSR { get; set; }
}
