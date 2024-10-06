public interface IMyOrderReporsitory
{
    IEnumerable<MyOrder> GetAllOrders();
    
    MyOrder GetMyOrderByID(string id);

    void AddMyOrder(MyOrder myOrder);

    void UpdateMyOrder(MyOrder myOrder);

    string DeleteMyOrder(string id);
}
