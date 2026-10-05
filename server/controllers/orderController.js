import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountPrice,
      totalAmount,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street) {
      return res.status(400).json({ message: "Shipping address is incomplete" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountPrice,
      totalAmount,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
      orderStatus: "Confirmed",
    });

    const createdOrder = await order.save();

    // Decrement stock for purchased items
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear user's database cart
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create order" });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch user orders" });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email phone");

    if (order) {
      // Ensure user owns order or is admin
      if (
        order.user._id.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({ message: "Not authorized to view this order" });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching order" });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized to cancel this order" });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({ message: "Delivered orders cannot be cancelled" });
    }

    order.orderStatus = "Cancelled";
    const updatedOrder = await order.save();

    // Restock products
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to cancel order" });
  }
};
