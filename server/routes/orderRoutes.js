import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // All order routes require authentication

router.route("/").post(createOrder);
router.route("/myorders").get(getMyOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/cancel").put(cancelOrder);

export default router;
