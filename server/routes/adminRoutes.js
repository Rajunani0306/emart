import express from "express";
import {
  getAdminStats,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUserRole,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth & admin middleware to all routes
router.use(protect, admin);

router.get("/stats", getAdminStats);

// Product management
router.post("/products", addProduct);
router.route("/products/:id").put(updateProduct).delete(deleteProduct);

// Order management
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);

// User management
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);

export default router;
