using MongoDB.Driver;

public class MyOrderRepository
{
    private readonly MongoDbContext _context;

    public MyOrderRepository(MongoDbContext context)
    {
        _context = context;
    }

    public IEnumerable<MyOrder> GetAllOrders()
    {
        return _context.Myorders.Find(_ => true).ToList(); // Retrieve all products
    }

    public MyOrder GetMyOrderByID(string id)
    {
        return _context.Myorders.Find(M => M.OrderID == id).FirstOrDefault();
    }

    public void AddMyOrder(MyOrder myOrder)
    {
        _context.Myorders.InsertOne(myOrder);
    }

    public void UpdateMyOrder(MyOrder myOrder)
    {
        var exarole = GetMyOrderByID(myOrder.OrderID);
        if (exarole == null)
        {
            throw new Exception("Admin Role not found.");
        }

        // Manually update the fields that need to be changed, ensuring _id remains the same
        exarole.OrderStatus = myOrder.OrderStatus;

        // Replace the vendor while keeping the _id intact
        _context.Myorders.ReplaceOne(m => m.OrderID == myOrder.OrderID, exarole);
    }

    public void DeleteMyOrder(string id)
    {
        _context.Myorders.DeleteOne(m => m.OrderID == id);
    }

    // public ARole GetARoleByEmail(string email)
    // {
    //     return _context.Aroles.Find(a => a.ARoleEmail == email).FirstOrDefault();
    // }

    public void UpdateOrder(MyOrder order)
    {
        _context.Myorders.ReplaceOne(o => o.OrderID == order.OrderID, order);
    }

    public MyOrder GetOrderById(string orderId)
    {
        return _context.Myorders.Find(order => order.OrderID == orderId).FirstOrDefault();
    }

}
