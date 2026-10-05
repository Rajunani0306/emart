import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// @desc    Get admin dashboard metrics & stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue from paid orders
    const paidOrders = await Order.find({ paymentStatus: "Completed" });
    const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Recent 5 orders
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    // Low stock products count
    const lowStockCount = await Product.countDocuments({ stock: { $lte: 5 } });

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      lowStockCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch admin stats" });
  }
};

// @desc    Add a new product
// @route   POST /api/admin/products
// @access  Private/Admin
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      originalPrice,
      discount,
      images,
      stock,
      specifications,
      isFeatured,
      isTrending,
      isBestSeller,
    } = req.body;

    if (!name || !brand || !category || !price) {
      return res.status(400).json({ message: "Name, brand, category, and price are required" });
    }

    const product = new Product({
      name,
      brand,
      category,
      description: description || "No description provided",
      price: Number(price),
      originalPrice: Number(originalPrice) || Number(price),
      discount: Number(discount) || 0,
      images: Array.isArray(images) && images.length > 0 ? images : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
      stock: Number(stock) || 10,
      specifications: specifications || {},
      isFeatured: !!isFeatured,
      isTrending: !!isTrending,
      isBestSeller: !!isBestSeller,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to add product" });
  }
};

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name ?? product.name;
      product.brand = req.body.brand ?? product.brand;
      product.category = req.body.category ?? product.category;
      product.description = req.body.description ?? product.description;
      product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
      product.originalPrice = req.body.originalPrice !== undefined ? Number(req.body.originalPrice) : product.originalPrice;
      product.discount = req.body.discount !== undefined ? Number(req.body.discount) : product.discount;
      product.stock = req.body.stock !== undefined ? Number(req.body.stock) : product.stock;
      if (req.body.images) product.images = req.body.images;
      if (req.body.specifications) product.specifications = req.body.specifications;
      if (req.body.isFeatured !== undefined) product.isFeatured = req.body.isFeatured;
      if (req.body.isTrending !== undefined) product.isTrending = req.body.isTrending;
      if (req.body.isBestSeller !== undefined) product.isBestSeller = req.body.isBestSeller;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update product" });
  }
};

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete product" });
  }
};

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch orders" });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      if (orderStatus) {
        order.orderStatus = orderStatus;
        if (orderStatus === "Delivered") {
          order.deliveredAt = new Date();
          order.paymentStatus = "Completed";
          order.isPaid = true;
        }
      }

      if (paymentStatus) {
        order.paymentStatus = paymentStatus;
        if (paymentStatus === "Completed") {
          order.isPaid = true;
          order.paidAt = new Date();
        }
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update order status" });
  }
};

// @desc    Get all users for admin
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch users" });
  }
};

// @desc    Update user role or status
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
      user.role = role || user.role;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update user role" });
  }
};
