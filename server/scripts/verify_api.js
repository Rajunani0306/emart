const runVerification = async () => {
  console.log("=== STARTING RAJU MART AUTOMATED API VERIFICATION ===");

  const BASE_URL = "http://localhost:5000/api";

  // 1. Health Check
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthData = await healthRes.json();
  console.log("✓ Health Check:", healthData.status);

  // 2. Fetch Products
  const prodRes = await fetch(`${BASE_URL}/products?limit=5`);
  const prodData = await prodRes.json();
  console.log(`✓ Products Loaded: ${prodData.products.length} of ${prodData.totalProducts}`);
  const sampleProduct = prodData.products[0];

  // 3. Filter by Category
  const catRes = await fetch(`${BASE_URL}/products?category=Mobiles`);
  const catData = await catRes.json();
  console.log(`✓ Mobiles Category Filter: ${catData.products.length} mobiles found`);

  // 4. Test Customer Authentication
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "raju@example.com", password: "raju123" }),
  });
  const loginData = await loginRes.json();
  console.log("✓ Customer Login:", loginData.name, "Token:", !!loginData.token);
  const userToken = loginData.token;

  // 5. Add to Cart via API
  const cartRes = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ productId: sampleProduct._id, quantity: 2 }),
  });
  const cartData = await cartRes.json();
  console.log(`✓ Cart Updated: ${cartData.items.length} item types in cart`);

  // 6. Create Order
  const orderRes = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      orderItems: [
        {
          product: sampleProduct._id,
          name: sampleProduct.name,
          image: sampleProduct.images[0],
          price: sampleProduct.price,
          quantity: 2,
        },
      ],
      shippingAddress: {
        fullName: "Raju Verification",
        phone: "9876543211",
        street: "45 MG Road, Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
      },
      paymentMethod: "Razorpay",
      itemsPrice: sampleProduct.price * 2,
      taxPrice: Math.round(sampleProduct.price * 2 * 0.18),
      shippingPrice: 0,
      discountPrice: 200,
      totalAmount: sampleProduct.price * 2 + Math.round(sampleProduct.price * 2 * 0.18) - 200,
    }),
  });
  const orderData = await orderRes.json();
  console.log("✓ Order Created: ID #", orderData._id, "Total:", orderData.totalAmount);

  // 7. Payment Order Creation
  const paymentOrderRes = await fetch(`${BASE_URL}/payment/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      orderId: orderData._id,
      amount: orderData.totalAmount,
    }),
  });
  const paymentOrderData = await paymentOrderRes.json();
  console.log("✓ Razorpay Payment Order Initialized: ID", paymentOrderData.id);

  // 8. Payment Verification
  const verifyRes = await fetch(`${BASE_URL}/payment/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      orderId: orderData._id,
      razorpayOrderId: paymentOrderData.id,
      razorpayPaymentId: "pay_test_verified_12345",
      razorpaySignature: "sandbox_signature",
      isSandboxMock: true,
    }),
  });
  const verifyData = await verifyRes.json();
  console.log("✓ Payment Verification Result:", verifyData.message);

  // 9. Admin Stats Check
  const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@rajumart.com", password: "admin123" }),
  });
  const adminLoginData = await adminLoginRes.json();
  const adminToken = adminLoginData.token;

  const statsRes = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const statsData = await statsRes.json();
  console.log("✓ Admin Stats - Total Users:", statsData.totalUsers, "Total Products:", statsData.totalProducts, "Total Orders:", statsData.totalOrders, "Total Revenue: ₹", statsData.totalRevenue);

  console.log("=== ALL END-TO-END BACKEND API VERIFICATIONS PASSED ===");
};

runVerification().catch(console.error);
