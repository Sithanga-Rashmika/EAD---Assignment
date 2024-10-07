using MongoDB.Driver;
using System.Collections.Generic;

public class CartRepository
{
    private readonly MongoDbContext _context;

    public CartRepository(MongoDbContext context)
    {
        _context = context;
    }

    // Get cart by CartID
    public Cart GetCartByProductId(string productID)
    {
        return _context.Carts.Find(cart => cart.ProductID == productID).FirstOrDefault();
    }

    // Get all carts for a specific customer
    public List<Cart> GetCartsByCustomerId(string customerId)
    {
        return _context.Carts.Find(cart => cart.CustomerID == customerId).ToList();
    }

    // Add a new cart
    public void AddCart(Cart cart)
    {
        _context.Carts.InsertOne(cart);
    }

    // Update a cart by CartID
    public void UpdateCart(string cartId, Cart updatedCart)
    {
        _context.Carts.ReplaceOne(cart => cart.CartID == cartId, updatedCart);
    }

    // Delete a cart by CartID
    public void DeleteCart(string cartId)
    {
        _context.Carts.DeleteOne(cart => cart.CartID == cartId);
    }

    public Cart GetCartByProductIdAndCustomerId(string productID, string customerID)
    {
        return _context.Carts
                       .Find(cart => cart.ProductID == productID && cart.CustomerID == customerID)
                       .FirstOrDefault();
    }

    public Cart GetCartById(string cartID)
    {
        return _context.Carts.Find(cart => cart.CartID == cartID).FirstOrDefault();
    }
    public List<Cart> GetCartItemsByCartID(string cartID)
    {
        return _context.Carts.Find(cart => cart.CartID == cartID).ToList();
    }

    public void DeleteCartByCartID(string cartID)
    {
        _context.Carts.DeleteMany(cart => cart.CartID == cartID);
    }


}
