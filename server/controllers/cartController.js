import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch cart" });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      cart.items[itemIndex].quantity += Number(quantity);
      cart.items[itemIndex].price = product.price;
    } else {
      // Product does not exist, add new item
      cart.items.push({
        product: productId,
        quantity: Number(quantity),
        price: product.price,
      });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate("items.product");
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to add item to cart" });
  }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = Number(quantity);
      }
      await cart.save();
      const populatedCart = await Cart.findById(cart._id).populate("items.product");
      return res.json(populatedCart);
    } else {
      return res.status(404).json({ message: "Item not in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update cart" });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate("items.product");
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to remove item from cart" });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Cart cleared successfully", items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to clear cart" });
  }
};

// @desc    Sync local guest cart items to backend on login
// @route   POST /api/cart/sync
// @access  Private
export const syncCart = async (req, res) => {
  try {
    const { localItems } = req.body;
    if (!Array.isArray(localItems) || localItems.length === 0) {
      const currentCart = await Cart.findOne({ user: req.user._id }).populate("items.product");
      return res.json(currentCart || { items: [] });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    for (const item of localItems) {
      const prodId = item.id || item.product || item._id;
      const product = await Product.findById(prodId);
      if (product) {
        const itemIndex = cart.items.findIndex(
          (ci) => ci.product.toString() === prodId.toString()
        );

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity = Math.max(
            cart.items[itemIndex].quantity,
            item.quantity || 1
          );
        } else {
          cart.items.push({
            product: prodId,
            quantity: item.quantity || 1,
            price: product.price,
          });
        }
      }
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate("items.product");
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to sync cart" });
  }
};
