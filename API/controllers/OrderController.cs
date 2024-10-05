using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly OrderRepository _orderRepository;

    public OrderController(OrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    // Track order status
    [HttpGet("track")]
    public IActionResult TrackOrder([FromQuery] string orderId)
    {
        var order = _orderRepository.GetOrderById(orderId);
        if (order == null)
            return NotFound("Order not found");

        return Ok(order);
    }

    // View order history for a customer
    [HttpGet("history")]
    public IActionResult OrderHistory([FromQuery] string customerId)
    {
        var orders = _orderRepository.GetOrdersByCustomer(customerId);
        return Ok(orders);
    }
}
