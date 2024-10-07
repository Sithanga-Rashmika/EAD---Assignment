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
        // Add the vendor to the repository
        _myorderrepository.AddMyOrder(myOrder);

        // Retrieve the product by ID
        var product = _productrepository.GetProductByID(myOrder.ProductID);

        if (product == null)
        {
            return NotFound(new { message = "Product not found" });
        }

        // Check if there's enough stock
        if (product.StockQuantity < myOrder.Quantity)
        {
            return BadRequest(new { message = "Insufficient product quantity" });
        }

        // Reduce the product quantity
        product.StockQuantity -= myOrder.Quantity;

        // Update the product in the repository
        _productrepository.UpdateProduct(product);


        // Return the created vendor
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
        return NoContent(); // Return 204 No Content on successful deletion
    }

    // [HttpPost("login")]
    // public IActionResult AROleLogin([FromBody] Dictionary<string, string> loginData)
    // {
    //     // Retrieve the email and password from the dictionary
    //     if (!loginData.TryGetValue("ARoleEmail", out string ARoleEmail) ||
    //         !loginData.TryGetValue("ARolePasswrod", out string ARolePasswrod))
    //     {
    //         return BadRequest(new { message = "Email or password is missing" });
    //     }

    //     // Retrieve the vendor by email
    //     var aRole = _myorderrepository.GetARoleByEmail(ARoleEmail);

    //     if (aRole == null)
    //     {
    //         return Unauthorized(new { message = "Invalid email or password" });
    //     }

    //     // Verify the entered password with the stored hashed password
    //     bool isPasswordValid = BCrypt.Net.BCrypt.Verify(ARolePasswrod, aRole.ARolePasswrod);

    //     if (!isPasswordValid)
    //     {
    //         return Unauthorized(new { message = "Invalid email or password" });
    //     }

    //     return Ok(aRole);
    // }// POST: api/Order/AddFromCart/{cartID}
    [HttpPost("AddFromCart/{cartID}")]
    public IActionResult AddOrderFromCart(string cartID)
    {
        // Step 1: Retrieve all cart items for the given cartID
        var cartItems = _cartRepository.GetCartItemsByCartID(cartID);
        if (cartItems == null || cartItems.Count == 0)
        {
            return NotFound(new { message = "Cart is empty or does not exist" });
        }

        // Create an empty list to hold orders
        List<MyOrder> orders = new List<MyOrder>();

        // Step 2: Process each cart item
        foreach (var cartItem in cartItems)
        {
            // Retrieve the product by ProductID from the cart item
            var product = _productrepository.GetProductByID(cartItem.ProductID);

            if (product == null)
            {
                return NotFound(new { message = $"Product with ID {cartItem.ProductID} not found." });
            }

            // Step 3: Check if there is enough stock for the product
            if (product.StockQuantity < cartItem.Quantity)
            {
                return BadRequest(new { message = $"Insufficient stock for product {product.Name}. Available: {product.StockQuantity}, Requested: {cartItem.Quantity}" });
            }

            // Step 4: Reduce the stock quantity for the product
            product.StockQuantity -= cartItem.Quantity;
            _productrepository.UpdateProduct(product); // Update product stock

            // Step 5: Create a new order for the cart item
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

            // Add the new order to the list of orders
            orders.Add(order);

            // Add the order to the order repository
            _myorderrepository.AddMyOrder(order);
        }

        // Step 6: Clear the cart by deleting all items with the given cartID
        _cartRepository.DeleteCartByCartID(cartID);

        // Return the created orders
        return Ok(new { message = "Order placed successfully", orders = orders });
    }

    // PUT: api/Order/UpdateStatus/{orderId}
    [HttpPut("UpdateStatus/{orderId}")]
    public IActionResult UpdateOrderStatus(string orderId, [FromForm] string orderStatus)
    {
        // Step 1: Retrieve the order by orderId
        var order = _myorderrepository.GetOrderById(orderId);
        if (order == null)
        {
            return NotFound(new { message = "Order not found." });
        }

        // Step 2: Update the order status
        order.OrderStatus = orderStatus;

        // Step 3: Save the updated order back to the repository
        _myorderrepository.UpdateOrder(order);

        // Return a success message
        return Ok(new { message = "Order status updated successfully." });
    }

}
