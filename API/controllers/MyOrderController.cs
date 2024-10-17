using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;


[ApiController]
[Route("api/[controller]")]
public class MyOrderController : ControllerBase
{
    private readonly MyOrderRepository _myorderrepository;
    private readonly ProductRepository _productrepository;

    private readonly CartRepository _cartRepository;
    public MyOrderController(MyOrderRepository myOrderRepository, ProductRepository productRepository, CartRepository cartRepository)
    {
        _myorderrepository = myOrderRepository;
        _productrepository = productRepository;
        _cartRepository = cartRepository;
    }

    // GET: api/Product
    [HttpGet]
    public ActionResult<IEnumerable<MyOrder>> GetAllOrders()
    {
        var ordersm = _myorderrepository.GetAllOrders();
        return Ok(ordersm);
    }

    // GET: api/Product/{id}
    [HttpGet("{id}")]
    public ActionResult<MyOrder> GetMyOrderByID(string id)
    {
        var morder = _myorderrepository.GetMyOrderByID(id);
        if (morder == null)
        {
            return NotFound(); // Return 404 if morder not found
        }
        return Ok(morder);
    }

    // POST: api/Product
    [HttpPost]
    public IActionResult AddMyOrder([FromBody] MyOrder myOrder)
    {
        _myorderrepository.AddMyOrder(myOrder);
        var product = _productrepository.GetProductByID(myOrder.ProductID);

        if (product == null)
        {
            return NotFound(new { message = "Product not found" });
        }

        if (product.StockQuantity < myOrder.Quantity)
        {
            return BadRequest(new { message = "Insufficient product quantity" });
        }

        product.StockQuantity -= myOrder.Quantity;
        _productrepository.UpdateProduct(product);
        return CreatedAtAction(nameof(GetMyOrderByID), new { id = myOrder.OrderID }, myOrder);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateMyOrder(string id, [FromBody] MyOrder myOrder)
    {
        var exarole = _myorderrepository.GetMyOrderByID(id);
        if (exarole == null)
        {
            return NotFound(); // Return 404 if product not found
        }

        // Update the product with new values
        _myorderrepository.UpdateMyOrder(myOrder);
        return NoContent(); // Return 204 No Content on successful update
    }

    // DELETE: api/Product/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteMyOrder(string id)
    {
        var aRole = _myorderrepository.GetMyOrderByID(id);
        if (aRole == null)
        {
            return NotFound(); // Return 404 if product not found
        }

        _myorderrepository.DeleteMyOrder(id);
        return NoContent();
    }
    [HttpPost("AddFromCart/{cartID}")]
    public IActionResult AddOrderFromCart(string cartID)
    {
        var cartItems = _cartRepository.GetCartItemsByCartID(cartID);
        if (cartItems == null || cartItems.Count == 0)
        {
            return NotFound(new { message = "Cart is empty or does not exist" });
        }

        List<MyOrder> orders = new List<MyOrder>();

        foreach (var cartItem in cartItems)
        {
            var product = _productrepository.GetProductByID(cartItem.ProductID);

            if (product == null)
            {
                return NotFound(new { message = $"Product with ID {cartItem.ProductID} not found." });
            }
            if (product.StockQuantity < cartItem.Quantity)
            {
                return BadRequest(new { message = $"Insufficient stock for product {product.Name}. Available: {product.StockQuantity}, Requested: {cartItem.Quantity}" });
            }
            product.StockQuantity -= cartItem.Quantity;
            _productrepository.UpdateProduct(product); // Update product stock

            var order = new MyOrder
            {
                OrderID = Guid.NewGuid().ToString(), // Generate a unique Order ID
                UserID = cartItem.CustomerID,
                ProductID = cartItem.ProductID,
                Quantity = cartItem.Quantity,
                Price = cartItem.Price,
                OrderDate = DateTime.Now,
                CartID = cartItem.CartID,
                ProductName = cartItem.ProductName,
                OrderStatus = "pending",
                VendorID = cartItem.VendorID
            };
            orders.Add(order);
            _myorderrepository.AddMyOrder(order);
        }
        _cartRepository.DeleteCartByCartID(cartID);
        return Ok(new { message = "Order placed successfully", orders = orders });
    }

    // PUT: api/Order/UpdateStatus/{orderId}
    [HttpPut("UpdateStatus/{orderId}")]
    public IActionResult UpdateOrderStatus(string orderId, [FromForm] string orderStatus)
    {
        var order = _myorderrepository.GetOrderById(orderId);
        if (order == null)
        {
            return NotFound(new { message = "Order not found." });
        }

        order.OrderStatus = orderStatus;
        _myorderrepository.UpdateOrder(order);

        return Ok(new { message = "Order status updated successfully." });
    }

    [HttpPut("Cancel/{orderId}")]
    public IActionResult UpdateOrderCancellStatus(string orderId, [FromForm] string orderStatus)
    {
        var order = _myorderrepository.GetOrderById(orderId);
        if (order == null)
        {
            return NotFound(new { message = "Order not found." });
        }
        if (order.OrderStatus != "dispatch")
        {
            order.OrderStatus = "Cancelled";
            _myorderrepository.UpdateOrder(order);
            return Ok(new { message = "Order status updated successfully." });
        }
        else
        {
            return BadRequest(new { message = "Order is in dispatch status. Can not cancell" });
        }
    }

    [HttpGet("Status/{status}")]
    public ActionResult<IEnumerable<MyOrder>> GetAllOrdersBystatus([FromRoute] string status)
    {
        var ordersm = _myorderrepository.GetOrdersByStatus(status);
        return Ok(ordersm);
    }

    [HttpGet("get/{vendorId}")]
    public ActionResult<IEnumerable<MyOrder>> GetOrdersByVendorId([FromRoute] string vendorId)
    {
        var ordersByVendor = _myorderrepository.GetOrdersByVendorId(vendorId);
        return Ok(ordersByVendor);
    }

    // GET: api/Order/{orderId}
    [HttpGet("order/{orderId}")]
    public ActionResult<MyOrder> GetOrderById(string orderId)
    {
        var order = _myorderrepository.GetOrderById(orderId);
        if (order == null)
        {
            return NotFound(new { message = "Order not found." });
        }
        return Ok(order);
    }
    [HttpGet("order/user/{userId}")]
    public ActionResult<List<MyOrder>> GetOrdersByUserId(string userId)
    {
        var orders = _myorderrepository.GetOrdersByUserId(userId);
        if (orders == null || !orders.Any())
        {
            return NotFound(new { message = "No orders found for this user." });
        }
        return Ok(orders);
    }

}
