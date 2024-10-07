using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using BCrypt.Net;


[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly CategoryRepository _categoryRepository;

    public CategoryController(CategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    // GET: api/Product
    [HttpGet]
    public ActionResult<IEnumerable<Category>> GetAllCategory()
    {
        var categories = _categoryRepository.GetAllCategory();
        return Ok(categories);
    }

    // GET: api/Product/{id}
    [HttpGet("{id}")]
    public ActionResult<Category> GetCategoryByID(string id)
    {
        var categiry = _categoryRepository.GetCategoryByID(id);
        if (categiry == null)
        {
            return NotFound(); // Return 404 if categiry not found
        }
        return Ok(categiry);
    }

    // POST: api/Product
    [HttpPost]
    public IActionResult AddCategory([FromBody] Category category)
    {
        _categoryRepository.AddCategory(category);
        return CreatedAtAction(nameof(GetAllCategory), new { id = category.CategoryID }, category);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCategory(string id, [FromBody] Category category)
    {
        var exCategory = _categoryRepository.GetCategoryByID(id);
        if (exCategory == null)
        {
            return NotFound(); // Return 404 if product not found
        }

        _categoryRepository.UpdateCategory(category);
        return NoContent(); // Return 204 No Content on successful update
    }

    // DELETE: api/Product/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteCategory(string id)
    {
        var category = _categoryRepository.GetCategoryByID(id);
        if (category == null)
        {
            return NotFound(); // Return 404 if product not found
        }

        _categoryRepository.DeleteCategory(id);
        return NoContent(); // Return 204 No Content on successful deletion
    }

    public class UpdateCategoryStatusRequest
    {
        public string CategoryId { get; set; }
        public bool Val { get; set; }
    }


    [HttpPut("update-status")]
    public IActionResult UpdateCategoryStatus([FromBody] UpdateCategoryStatusRequest request)
    {
        if (string.IsNullOrEmpty(request.CategoryId))
        {
            return BadRequest(new { message = "Category ID is missing or invalid" });
        }

        // add new variable to catch the return ***sithanga***
        var updatedCategory = _categoryRepository.UpdateCategoryStatus(request.CategoryId, request.Val);

        return Ok(updatedCategory); // return it ***sithanga****
    }


}
