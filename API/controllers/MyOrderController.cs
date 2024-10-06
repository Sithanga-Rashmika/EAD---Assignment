using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;


[ApiController]
[Route("api/[controller]")]
public class MyOrderController : ControllerBase
{
    private readonly MyOrderRepository _myorderrepository;
    private readonly ProductRepository _productrepository;

    public MyOrderController(MyOrderRepository myOrderRepository,  ProductRepository productRepository)
    {
        _myorderrepository = myOrderRepository;
        _productrepository = productRepository;
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
    // }
}
