import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  syncCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // All cart routes require authentication

router.route("/").get(getCart).post(addToCart).delete(clearCart);
router.post("/sync", syncCart);
router.route("/:productId").put(updateCartItem).delete(removeCartItem);

export default router;
