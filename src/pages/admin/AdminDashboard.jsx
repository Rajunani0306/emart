import React, { useState, useEffect } from "react";
import {
  FaBoxes,
  FaShoppingBag,
  FaUsers,
  FaRupeeSign,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaCheck,
  FaExclamationTriangle,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";
import API from "../../services/api";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'products', 'orders', 'users'

  // Stats state
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Products state
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [productPage, setProductPage] = useState(1);
  const [productPages, setProductPages] = useState(1);

  // Orders state
  const [orders, setOrders] = useState([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");

  // Users state
  const [users, setUsers] = useState([]);

  // Product Add / Edit Modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    brand: "",
    category: "Mobiles",
    price: "",
    originalPrice: "",
    discount: 0,
    stock: 10,
    image: "",
    description: "",
  });

  const [savingProduct, setSavingProduct] = useState(false);

  // Load Dashboard Overview Stats
  const loadStats = async () => {
    try {
      const { data } = await API.get("/admin/stats");
      setStats(data);
    } catch (err) {
      console.warn("Failed to load admin stats:", err.message);
    }
  };

  // Load Products
  const loadProducts = async () => {
    try {
      const { data } = await API.get(
        `/products?page=${productPage}&limit=10&search=${encodeURIComponent(productSearch)}`
      );
      setProducts(data.products || []);
      setProductPages(data.pages || 1);
    } catch (err) {
      console.warn("Failed to load products:", err.message);
    }
  };

  // Load Orders
  const loadOrders = async () => {
    try {
      const { data } = await API.get("/admin/orders");
      setOrders(data || []);
    } catch (err) {
      console.warn("Failed to load admin orders:", err.message);
    }
  };

  // Load Users
  const loadUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data || []);
    } catch (err) {
      console.warn("Failed to load users:", err.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([loadStats(), loadProducts(), loadOrders(), loadUsers()]);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (activeTab === "products") {
      loadProducts();
    }
  }, [productPage, productSearch, activeTab]);

  // Handle Product Save (Create or Update)
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSavingProduct(true);
    try {
      const payload = {
        name: productForm.name,
        brand: productForm.brand,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice || productForm.price),
        discount: Number(productForm.discount || 0),
        stock: Number(productForm.stock || 0),
        images: [productForm.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
        description: productForm.description,
      };

      if (editingProduct) {
        await API.put(`/admin/products/${editingProduct._id}`, payload);
      } else {
        await API.post("/admin/products", payload);
      }

      setShowProductModal(false);
      setEditingProduct(null);
      await loadProducts();
      await loadStats();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save product");
    } finally {
      setSavingProduct(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/admin/products/${id}`);
      await loadProducts();
      await loadStats();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  // Open Edit Modal
  const openEditProduct = (p) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      discount: p.discount || 0,
      stock: p.stock,
      image: p.images?.[0] || p.image || "",
      description: p.description,
    });
    setShowProductModal(true);
  };

  // Open Add Modal
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      brand: "",
      category: "Mobiles",
      price: "",
      originalPrice: "",
      discount: 0,
      stock: 15,
      image: "",
      description: "",
    });
    setShowProductModal(true);
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/admin/orders/${orderId}/status`, { orderStatus: newStatus });
      await loadOrders();
      await loadStats();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order status");
    }
  };

  // Toggle User Role
  const handleToggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (!window.confirm(`Change this user's role to ${newRole.toUpperCase()}?`)) return;
    try {
      await API.put(`/admin/users/${userId}/role`, { role: newRole });
      await loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user role");
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Loading admin control panel..." />;
  }

  const filteredOrders =
    orderStatusFilter === "All"
      ? orders
      : orders.filter((o) => o.orderStatus === orderStatusFilter);

  return (
    <div className="admin-dashboard-page py-4">
      <div className="container-fluid px-lg-5">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-danger text-white p-2 rounded-circle">
              <FaShieldAlt size={22} />
            </div>
            <div>
              <h3 className="fw-black text-dark mb-0">Admin Control Panel</h3>
              <span className="text-muted small">Manage products, orders, inventory and users</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="btn-group mt-3 mt-sm-0 shadow-sm" role="group">
            <button
              className={`btn btn-sm px-3 fw-semibold ${
                activeTab === "overview" ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`btn btn-sm px-3 fw-semibold ${
                activeTab === "products" ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products ({stats?.totalProducts || 0})
            </button>
            <button
              className={`btn btn-sm px-3 fw-semibold ${
                activeTab === "orders" ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders ({stats?.totalOrders || 0})
            </button>
            <button
              className={`btn btn-sm px-3 fw-semibold ${
                activeTab === "users" ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setActiveTab("users")}
            >
              Users ({stats?.totalUsers || 0})
            </button>
          </div>
        </div>

        {/* METRICS STATS CARDS */}
        <div className="row g-3 mb-4">
          <div className="col-sm-6 col-lg-3">
            <div className="card shadow-sm border-0 rounded-4 p-3 bg-white h-100 border-start border-4 border-primary">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small text-uppercase fw-bold letter-spacing-1">
                    Total Revenue
                  </span>
                  <h3 className="fw-black text-dark mb-0">
                    ₹{Number(stats?.totalRevenue || 0).toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
                  <FaRupeeSign size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="card shadow-sm border-0 rounded-4 p-3 bg-white h-100 border-start border-4 border-success">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small text-uppercase fw-bold letter-spacing-1">
                    Total Orders
                  </span>
                  <h3 className="fw-black text-dark mb-0">{stats?.totalOrders || 0}</h3>
                </div>
                <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle">
                  <FaShoppingBag size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="card shadow-sm border-0 rounded-4 p-3 bg-white h-100 border-start border-4 border-warning">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small text-uppercase fw-bold letter-spacing-1">
                    Total Products
                  </span>
                  <h3 className="fw-black text-dark mb-0">{stats?.totalProducts || 0}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle">
                  <FaBoxes size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="card shadow-sm border-0 rounded-4 p-3 bg-white h-100 border-start border-4 border-info">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small text-uppercase fw-bold letter-spacing-1">
                    Registered Users
                  </span>
                  <h3 className="fw-black text-dark mb-0">{stats?.totalUsers || 0}</h3>
                </div>
                <div className="bg-info bg-opacity-10 text-info p-3 rounded-circle">
                  <FaUsers size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="row g-4">
              {/* Recent Orders */}
              <div className="col-lg-8">
                <div className="card shadow-sm border-0 rounded-4 p-4 bg-white h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-dark mb-0">Recent Orders</h5>
                    <button
                      className="btn btn-link text-decoration-none btn-sm p-0 fw-semibold"
                      onClick={() => setActiveTab("orders")}
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle small mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats?.recentOrders?.map((ord) => (
                          <tr key={ord._id}>
                            <td className="fw-bold">#{ord._id.slice(-6)}</td>
                            <td>{ord.user?.name || "Customer"}</td>
                            <td className="fw-semibold">
                              ₹{Number(ord.totalAmount).toLocaleString("en-IN")}
                            </td>
                            <td>
                              <span className="badge bg-primary-subtle text-primary">
                                {ord.orderStatus}
                              </span>
                            </td>
                            <td className="text-muted">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Low Stock */}
              <div className="col-lg-4">
                <div className="card shadow-sm border-0 rounded-4 p-4 bg-white mb-4">
                  <h5 className="fw-bold text-dark mb-3">Quick Actions</h5>
                  <div className="d-flex flex-column gap-2">
                    <button
                      onClick={openAddProduct}
                      className="btn btn-primary fw-semibold d-flex align-items-center justify-content-center gap-2 py-2 rounded-3"
                    >
                      <FaPlus /> Add New Product
                    </button>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="btn btn-outline-secondary fw-semibold py-2 rounded-3"
                    >
                      Manage Orders
                    </button>
                    <button
                      onClick={() => setActiveTab("users")}
                      className="btn btn-outline-secondary fw-semibold py-2 rounded-3"
                    >
                      View All Customers
                    </button>
                  </div>
                </div>

                <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
                  <div className="d-flex align-items-center gap-2 mb-2 text-warning">
                    <FaExclamationTriangle />
                    <h6 className="fw-bold mb-0 text-dark">Inventory Alert</h6>
                  </div>
                  <p className="text-muted small mb-0">
                    <strong>{stats?.lowStockCount || 0}</strong> products are currently running low on stock (under 5 units). Check the product list to replenish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS MANAGEMENT ================= */}
        {activeTab === "products" && (
          <div className="products-tab">
            <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
              {/* Header + Search + Add Button */}
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div className="input-group" style={{ maxWidth: "320px" }}>
                  <span className="input-group-text bg-light text-muted border-end-0">
                    <FaSearch size={13} />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setProductPage(1);
                    }}
                  />
                </div>

                <button
                  onClick={openAddProduct}
                  className="btn btn-success fw-bold d-flex align-items-center gap-2 rounded-pill px-4 shadow-sm"
                >
                  <FaPlus /> Add New Product
                </button>
              </div>

              {/* Products Table */}
              <div className="table-responsive">
                <table className="table table-hover align-middle small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id}>
                        <td>
                          <img
                            src={p.images?.[0] || p.image}
                            alt={p.name}
                            style={{ width: "42px", height: "42px", objectFit: "contain" }}
                            className="rounded border p-1"
                          />
                        </td>
                        <td className="fw-semibold text-dark text-truncate" style={{ maxWidth: "260px" }}>
                          {p.name}
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">{p.category}</span>
                        </td>
                        <td>{p.brand}</td>
                        <td className="fw-bold">₹{Number(p.price).toLocaleString("en-IN")}</td>
                        <td>
                          <span
                            className={`badge ${
                              p.stock > 10
                                ? "bg-success"
                                : p.stock > 0
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {p.stock} units
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            onClick={() => openEditProduct(p)}
                            className="btn btn-light btn-sm text-primary me-2"
                            title="Edit Product"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p._id)}
                            className="btn btn-light btn-sm text-danger"
                            title="Delete Product"
                          >
                            <FaTrash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {productPages > 1 && (
                <div className="d-flex justify-content-center gap-2 mt-4">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={productPage <= 1}
                    onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                  <span className="align-self-center small text-muted px-2">
                    Page {productPage} of {productPages}
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={productPage >= productPages}
                    onClick={() => setProductPage((p) => Math.min(productPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDERS MANAGEMENT ================= */}
        {activeTab === "orders" && (
          <div className="orders-tab">
            <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
              {/* Filter Row */}
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <h5 className="fw-bold text-dark mb-0">Customer Orders ({filteredOrders.length})</h5>

                <div className="d-flex align-items-center gap-2">
                  <span className="small fw-semibold text-muted">Status:</span>
                  <select
                    className="form-select form-select-sm"
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    style={{ width: "170px" }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Address</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Order Status</th>
                      <th>Change Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((ord) => (
                      <tr key={ord._id}>
                        <td className="fw-bold">#{ord._id.slice(-6)}</td>
                        <td>
                          <strong>{ord.shippingAddress?.fullName || ord.user?.name}</strong>
                          <span className="text-muted d-block font-xs">
                            {ord.shippingAddress?.phone}
                          </span>
                        </td>
                        <td className="text-truncate" style={{ maxWidth: "160px" }}>
                          {ord.shippingAddress?.city}, {ord.shippingAddress?.state}
                        </td>
                        <td>{ord.orderItems?.length || 1} items</td>
                        <td className="fw-bold">
                          ₹{Number(ord.totalAmount).toLocaleString("en-IN")}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              ord.paymentStatus === "Completed" ? "bg-success" : "bg-warning text-dark"
                            }`}
                          >
                            {ord.paymentStatus}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-primary px-2 py-1">{ord.orderStatus}</span>
                        </td>
                        <td>
                          <select
                            className="form-select form-select-xs"
                            value={ord.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: USERS MANAGEMENT ================= */}
        {activeTab === "users" && (
          <div className="users-tab">
            <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
              <h5 className="fw-bold text-dark mb-4">Registered Accounts ({users.length})</h5>

              <div className="table-responsive">
                <table className="table table-hover align-middle small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Registered</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td className="fw-bold text-dark">{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>
                          <span
                            className={`badge ${
                              u.role === "admin" ? "bg-danger" : "bg-secondary"
                            }`}
                          >
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="text-muted">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="text-end">
                          <button
                            onClick={() => handleToggleUserRole(u._id, u.role)}
                            className="btn btn-outline-secondary btn-xs py-1 px-2"
                          >
                            Toggle to {u.role === "admin" ? "User" : "Admin"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= PRODUCT ADD / EDIT MODAL ================= */}
      {showProductModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1060 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-bottom p-4">
                <h5 className="modal-title fw-bold">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProductModal(false)}
                ></button>
              </div>

              <form onSubmit={handleProductSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label small fw-bold text-muted">Product Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-muted">Brand *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={productForm.brand}
                        onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-muted">Category *</label>
                      <select
                        className="form-select"
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        required
                      >
                        <option value="Mobiles">Mobiles</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Computers">Computers</option>
                        <option value="Electronics">Electronics</option>
                        <option value="TVs">TVs</option>
                        <option value="Headphones">Headphones</option>
                        <option value="Smart Watches">Smart Watches</option>
                        <option value="Cameras">Cameras</option>
                        <option value="Men's Clothing">Men's Clothing</option>
                        <option value="Women's Clothing">Women's Clothing</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Bags">Bags</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Home Appliances">Home Appliances</option>
                        <option value="Sports">Sports</option>
                        <option value="Books">Books</option>
                        <option value="Toys">Toys</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-muted">Price (₹) *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-muted">Original Price (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={productForm.originalPrice}
                        onChange={(e) =>
                          setProductForm({ ...productForm, originalPrice: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-muted">Discount (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={productForm.discount}
                        onChange={(e) => setProductForm({ ...productForm, discount: e.target.value })}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-muted">Stock Quantity *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-muted">Image URL</label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://images.unsplash.com/..."
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold text-muted">Description</label>
                      <textarea
                        rows={3}
                        className="form-control"
                        value={productForm.description}
                        onChange={(e) =>
                          setProductForm({ ...productForm, description: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top p-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowProductModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingProduct}
                    className="btn btn-primary fw-bold px-4"
                  >
                    {savingProduct ? "Saving..." : "Save Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
