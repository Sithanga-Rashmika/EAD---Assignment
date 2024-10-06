using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly CartRepository _cartRepository;
    private readonly ProductRepository _productRepository;

    public CartController(CartRepository cartRepository, ProductRepository productRepository)
    {
        _cartRepository = cartRepository;
        _productRepository = productRepository;
    }

    // Add a new cart item
    [HttpPost("add")]
    public IActionResult AddCart(
     [FromForm] string? cartID,
    [FromForm] string? customerID,
    [FromForm] string? productID,
    [FromForm] int? quantity,
    [FromForm] string? vendorID,
    [FromForm] string? productName,
    [FromForm] double? price,
    [FromForm] string? status)
    {
        var cart = new Cart
        {
            CartID = cartID ?? "Unknown",
            CustomerID = customerID ?? "Unknown",
            ProductID = productID ?? "Unknown",
            Quantity = quantity ?? 1,
            VendorID = vendorID ?? "Unknown",
            ProductName = productName ?? "Unknown",
            Price = price ?? 0.0,
            Status = status ?? "Unknown",
            Date = DateTime.Now
        };
        var product = _productRepository.GetProductByID(cart.ProductID);
        if (product == null)
        {
            return NotFound();
        }
        if (product.StockQuantity >= quantity)
        {
            _cartRepository.AddCart(cart);
            return Ok("Cart item added successfully.");
        }
        else
        {
            return BadRequest("No such stocks");
        }
    }


    // Get all carts for a specific customer
    [HttpGet("customer/{customerId}")]
    public IActionResult GetCartsByCustomerId(string customerId)
    {
        var carts = _cartRepository.GetCartsByCustomerId(customerId);
        if (carts == null || carts.Count == 0)
        {
            return NotFound("No carts found for this customer.");
        }
        return Ok(carts);
    }

    // Delete a cart item
    [HttpDelete("delete/{productID}/{customerID}")]
    public IActionResult DeleteCart(string productID, string customerID)
    {
        var cart = _cartRepository.GetCartByProductIdAndCustomerId(productID, customerID);
        if (cart == null)
        {
            return NotFound("Cart item not found.");
        }

        _cartRepository.DeleteCart(cart.Id.ToString());
        return Ok("Cart item deleted successfully.");
    }
}
