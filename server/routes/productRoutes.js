import express from "express";
import {
  getProducts,
  getProductById,
  getHomeCollections,
  getFilterMetadata,
  createProductReview,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/home/collections", getHomeCollections);
router.get("/meta/filters", getFilterMetadata);
router.get("/:id", getProductById);
router.post("/:id/reviews", protect, createProductReview);

export default router;
