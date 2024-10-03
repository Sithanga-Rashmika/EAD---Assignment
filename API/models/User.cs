using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User
{
   
    [BsonElement("email")]
    public string Email { get; set; }

    [BsonElement("password")]
    public string Password { get; set; }

    [BsonElement("isActive")]
    public bool IsActive { get; set; }

    [BsonElement("isDeactivatedByCSR")]
    public bool IsDeactivatedByCSR { get; set; }
}
