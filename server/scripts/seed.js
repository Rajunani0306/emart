import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Payment from "../models/Payment.js";
import rawProducts from "../../src/data/product.js";

dotenv.config();

const sampleReviews = [
  { rating: 5, comment: "Exceptional quality! Totally worth the price, highly recommended." },
  { rating: 4, comment: "Very good product. Delivery was fast and packaging was sturdy." },
  { rating: 5, comment: "Exceeded my expectations, fantastic build quality and finish." },
  { rating: 4, comment: "Solid performer, been using for 2 weeks with zero issues." },
  { rating: 5, comment: "Best purchase in this category. RAJU MART never disappoints!" },
];

const seedData = async () => {
  try {
    await connectDB();

    console.log("Clearing existing database collections...");
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Payment.deleteMany();

    console.log("Creating default demo users...");
    const adminUser = await User.create({
      name: "Admin Raju",
      email: "admin@rajumart.com",
      phone: "9876543210",
      password: "admin123",
      role: "admin",
      address: {
        street: "Plot 102, Silicon Cyber City",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001",
      },
    });

    const customerUser = await User.create({
      name: "Raju Kumar",
      email: "raju@example.com",
      phone: "9876543211",
      password: "raju123",
      role: "user",
      address: {
        street: "45 MG Road, Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
      },
    });

    console.log(`Users created: ${adminUser.email} (Admin), ${customerUser.email} (Customer)`);

    console.log(`Transforming and seeding ${rawProducts.length} products...`);
    const preparedProducts = rawProducts.map((p, index) => {
      const markupPercent = (index % 5) * 5 + 15; // 15% to 35% discount
      const originalPrice = Math.round(p.price * (1 + markupPercent / 100));
      const discount = Math.round(((originalPrice - p.price) / originalPrice) * 100);

      // Create 2-3 gallery images
      const images = [
        p.image,
        `${p.image}?auto=format&fit=crop&w=700&q=80`,
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80",
      ];

      const reviews = [
        {
          user: customerUser._id,
          name: customerUser.name,
          rating: sampleReviews[index % sampleReviews.length].rating,
          comment: sampleReviews[index % sampleReviews.length].comment,
        },
      ];

      return {
        name: p.title || p.name,
        brand: p.brand || "RAJU MART Choice",
        category: p.category || "General",
        description: p.description || `Premium quality ${p.title || p.name} with reliable durability and great style.`,
        price: p.price,
        originalPrice,
        discount,
        images,
        rating: p.rating || 4.5,
        numReviews: reviews.length + (index % 40) + 5,
        reviews,
        stock: p.stock !== undefined ? p.stock : 20,
        specifications: {
          Brand: p.brand || "RAJU MART Choice",
          Category: p.category || "General",
          Warranty: "1 Year Domestic Brand Warranty",
          "Box Contents": "Main Unit, User Manual, Warranty Documentation",
          Condition: "100% Original Brand New",
          Delivery: "Free Express Delivery available",
        },
        isFeatured: index % 6 === 0,
        isTrending: index % 5 === 0,
        isBestSeller: index % 4 === 0,
      };
    });

    const insertedProducts = await Product.insertMany(preparedProducts);
    console.log(`Successfully seeded ${insertedProducts.length} products!`);

    // Create an initial sample order for the customer user
    const sampleProduct1 = insertedProducts[0];
    const sampleProduct2 = insertedProducts[1];

    const sampleOrder = await Order.create({
      user: customerUser._id,
      orderItems: [
        {
          product: sampleProduct1._id,
          name: sampleProduct1.name,
          image: sampleProduct1.images[0],
          price: sampleProduct1.price,
          quantity: 1,
        },
        {
          product: sampleProduct2._id,
          name: sampleProduct2.name,
          image: sampleProduct2.images[0],
          price: sampleProduct2.price,
          quantity: 1,
        },
      ],
      shippingAddress: customerUser.address,
      shippingAddress: {
        fullName: customerUser.name,
        phone: customerUser.phone,
        street: customerUser.address.street,
        city: customerUser.address.city,
        state: customerUser.address.state,
        pincode: customerUser.address.pincode,
      },
      paymentMethod: "Razorpay",
      paymentResult: {
        id: "pay_test_initial_demo_987",
        status: "COMPLETED",
        update_time: new Date().toISOString(),
        email_address: customerUser.email,
        razorpayOrderId: "order_test_demo_123",
        razorpayPaymentId: "pay_test_initial_demo_987",
        razorpaySignature: "test_verified_signature",
      },
      itemsPrice: sampleProduct1.price + sampleProduct2.price,
      taxPrice: Math.round((sampleProduct1.price + sampleProduct2.price) * 0.18),
      shippingPrice: 0,
      discountPrice: 500,
      totalAmount:
        sampleProduct1.price +
        sampleProduct2.price +
        Math.round((sampleProduct1.price + sampleProduct2.price) * 0.18) -
        500,
      paymentStatus: "Completed",
      orderStatus: "Processing",
      isPaid: true,
      paidAt: new Date(),
    });

    console.log(`Created demo order: #${sampleOrder._id}`);
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
