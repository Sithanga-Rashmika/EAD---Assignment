using MongoDB.Driver;
using MongoDB.Bson;

public class OrderRepository
{
    private readonly MongoDbContext _context;

    public OrderRepository(MongoDbContext context)
    {
        _context = context;
    }

    public void AddOrder(Order order)
    {
        _context.Orders.InsertOne(order);
    }

    public void UpdateOrder(Order order)
    {
        _context.Orders.ReplaceOne(o => o.Id == order.Id, order);
    }

    public Order GetOrderById(string orderId)
    {
        var objectId = ObjectId.Parse(orderId);
        return _context.Orders.Find(o => o.Id == objectId).FirstOrDefault();
    }

    public IEnumerable<Order> GetOrdersByCustomer(string customerId)
    {
        return _context.Orders.Find(o => o.CustomerID == customerId).ToList();
    }
}
