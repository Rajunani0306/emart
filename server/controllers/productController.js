import Product from "../models/Product.js";

// @desc    Fetch all products with filtering, search, sorting & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;

    const query = {};

    // Search query
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { brand: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
        { category: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Category filter
    if (req.query.category && req.query.category !== "All") {
      query.category = { $regex: new RegExp(`^${req.query.category}$`, "i") };
    }

    // Brand filter
    if (req.query.brand && req.query.brand !== "All") {
      query.brand = { $regex: new RegExp(`^${req.query.brand}$`, "i") };
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Rating filter
    if (req.query.minRating) {
      query.rating = { $gte: Number(req.query.minRating) };
    }

    // In stock filter
    if (req.query.inStock === "true") {
      query.stock = { $gt: 0 };
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // default newest
    if (req.query.sortBy === "price_asc") {
      sortOptions = { price: 1 };
    } else if (req.query.sortBy === "price_desc") {
      sortOptions = { price: -1 };
    } else if (req.query.sortBy === "rating_desc") {
      sortOptions = { rating: -1 };
    } else if (req.query.sortBy === "newest") {
      sortOptions = { createdAt: -1 };
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize) || 1,
      totalProducts: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch products" });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // Also fetch 4 related products from the same category
      const relatedProducts = await Product.find({
        category: product.category,
        _id: { $ne: product._id },
      }).limit(4);

      res.json({
        product,
        relatedProducts,
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching product details" });
  }
};

// @desc    Get home page collections (featured, trending, best sellers, top discounts)
// @route   GET /api/products/home/collections
// @access  Public
export const getHomeCollections = async (req, res) => {
  try {
    const featured = await Product.find({ isFeatured: true }).limit(8);
    const trending = await Product.find({ isTrending: true }).limit(8);
    const bestSellers = await Product.find({ isBestSeller: true }).limit(8);
    const deals = await Product.find({ discount: { $gte: 20 } })
      .sort({ discount: -1 })
      .limit(8);
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);

    res.json({
      featured: featured.length ? featured : await Product.find().limit(8),
      trending: trending.length ? trending : await Product.find().skip(8).limit(8),
      bestSellers: bestSellers.length ? bestSellers : await Product.find().skip(16).limit(8),
      deals: deals.length ? deals : await Product.find().skip(24).limit(8),
      newArrivals: newArrivals.length ? newArrivals : await Product.find().skip(32).limit(8),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching home collections" });
  }
};

// @desc    Get all distinct categories and brands
// @route   GET /api/products/meta/filters
// @access  Public
export const getFilterMetadata = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const brands = await Product.distinct("brand");
    res.json({ categories, brands });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching filters" });
  }
};

// @desc    Create a new product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: "You have already reviewed this product" });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error adding review" });
  }
};
