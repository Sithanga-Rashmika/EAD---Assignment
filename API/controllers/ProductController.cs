using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductRepository _productRepository;

    public ProductController(ProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    // GET: api/Product
    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAllProducts()
    {
        var products = _productRepository.GetAllProducts();
        return Ok(products);
    }

    // GET: api/Product/{id}
    [HttpGet("{id}")]
    public ActionResult<Product> GetProductByID(string id)
    {
        var product = _productRepository.GetProductByID(id);
        if (product == null)
        {
            return NotFound(); // Return 404 if product not found
        }
        return Ok(product);
    }

   [HttpPost("add")]
    public IActionResult AddProduct([FromForm] Product product, [FromForm] IFormFile imageFile)
    {
        if (imageFile == null || imageFile.Length == 0)
        {
            return BadRequest("Image file is required."); // Return error if image file is missing
        }

        // Generate a unique filename
        var fileName = Path.GetFileName(imageFile.FileName);
        var filePath = Path.Combine("wwwroot/images", fileName); // Save the file to the server

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            imageFile.CopyTo(stream);
        }

        // Set the product image URL to the file path
        product.ImageUrl = $"/images/{fileName}";

        _productRepository.AddProduct(product);
        return Ok("Product added successfully");
    }

   // PUT: api/Product/{id}
    [HttpPut("{id}")]
    public IActionResult UpdateProduct(string id, [FromForm] Product product, [FromForm] IFormFile imageFile)
    {
        var existingProduct = _productRepository.GetProductByID(id);
        if (existingProduct == null)
        {
            return NotFound(); // Return 404 if product not found
        }

        // Handle the image file if provided
        if (imageFile != null && imageFile.Length > 0)
        {
            // Generate a unique filename
            var fileName = Path.GetFileName(imageFile.FileName);
            var filePath = Path.Combine("wwwroot/images", fileName); // Save the file to the server

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                imageFile.CopyTo(stream);
            }

            // Set the product image URL to the file path
            product.ImageUrl = $"/images/{fileName}";
        }
        else
        {
            // Optionally, keep the existing image URL if no new image is provided
            product.ImageUrl = existingProduct.ImageUrl;
        }

        // Update the product with new values
        _productRepository.UpdateProduct(product);
        return NoContent(); // Return 204 No Content on successful update
    }
    
    // DELETE: api/Product/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(string id)
    {
        var product = _productRepository.GetProductByID(id);
        if (product == null)
        {
            return NotFound(); // Return 404 if product not found
        }

        _productRepository.DeleteProduct(id);
        return NoContent(); // Return 204 No Content on successful deletion
    }
}
