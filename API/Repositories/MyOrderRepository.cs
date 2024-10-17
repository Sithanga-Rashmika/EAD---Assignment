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

        exarole.OrderStatus = myOrder.OrderStatus;
        _context.Myorders.ReplaceOne(m => m.OrderID == myOrder.OrderID, exarole);
    }

    public void DeleteMyOrder(string id)
    {
        _context.Myorders.DeleteOne(m => m.OrderID == id);
    }

    public void UpdateOrder(MyOrder order)
    {
        _context.Myorders.ReplaceOne(o => o.OrderID == order.OrderID, order);
    }

    public MyOrder GetOrderById(string orderId)
    {
        return _context.Myorders.Find(order => order.OrderID == orderId).FirstOrDefault();
    }

    public IEnumerable<MyOrder> GetOrdersByStatus(string status)
    {
        // Retrieve only the orders that match the specified status
        return _context.Myorders.Find(order => order.OrderStatus == status).ToList();
    }

    public IEnumerable<MyOrder> GetOrdersByVendorId(string vendorId)
    {
        // Retrieve only the orders that match the specified vendor ID
        return _context.Myorders.Find(order => order.VendorID == vendorId).ToList();
    }
    public List<MyOrder> GetOrdersByUserId(string userId)
    {
        return _context.Myorders.Find(order => order.UserID == userId).ToList();
    }

}
