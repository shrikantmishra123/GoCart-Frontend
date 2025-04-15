import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlusCircle, FaUserCircle, FaCheckCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  const vendorId = JSON.parse(localStorage.getItem("vendor_id"));
  const [vendorData, setVendorData] = useState(null);
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderFilter, setOrderFilter] = useState(null); // "pending" or "completed"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({
    vendorId,
    name: "",
    price: "",
    category: "",
    stock: "",
    discount: "",
    image: "",
  });

  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (vendorId) {
      axios.get(`https://gocart-gqbi.onrender.com/vendors/${vendorId}`)
        .then((res) => setVendorData(res.data.data))
        .catch((err) => console.error("Vendor fetch failed:", err));
  
      // Fetching products
      axios.get(`https://gocart-gqbi.onrender.com/products/${vendorId}`)
        .then((res) => setProductList(res.data.data))
        .catch((err) => console.error("Product fetch failed:", err));
  
      // Fetching orders to set initial pending and completed counts
      axios.get("https://gocart-gqbi.onrender.com/orders")
        .then((res) => {
          const allOrders = res.data.data;
          const vendorOrders = allOrders.filter(order => order.products.some(p => p.productId.vendorId === vendorId));
  
          // Calculate pending and completed orders
          const pendingOrders = vendorOrders.filter(order => order.status === "pending");
          const completedOrders = vendorOrders.filter(order => order.status === "completed");
  
          setOrderList(vendorOrders);
          setPendingCount(pendingOrders.reduce((acc, order) => acc + order.products.length, 0));
          setTotalEarnings(completedOrders.reduce((acc, order) => {
            return acc + order.products.reduce((total, p) => total + (p.quantity * p.productId.price), 0);
          }, 0));
        })
        .catch((err) => console.error("Order fetch failed:", err));
    }
  }, [vendorId]);
  

  const fetchOrders = (status) => {
    axios.get("https://gocart-gqbi.onrender.com/orders")
      .then((res) => {
        const allOrders = res.data.data;
        const vendorOrders = allOrders
          .filter(order => order.status === status)
          .map(order => {
            const filteredProducts = order.products.filter(p => p.productId.vendorId === vendorId);
            if (filteredProducts.length > 0) {
              return {
                ...order,
                products: filteredProducts
              };
            }
            return null;
          })
          .filter(order => order !== null);

        setOrderList(vendorOrders);
        setOrderFilter(status);

        // Count total earnings or pending products
        if (status === "completed") {
          let earnings = 0;
          vendorOrders.forEach(order => {
            order.products.forEach(p => {
              earnings += p.quantity * p.productId.price;
            });
          });
          setTotalEarnings(earnings);
        } else if (status === "pending") {
          let total = 0;
          vendorOrders.forEach(order => {
            order.products.forEach(p => {
              total += p.quantity;
            });
          });
          setPendingCount(total);
        }

      })
      .catch(err => console.error("Order fetch failed:", err));
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitProduct = () => {
    axios.post("https://gocart-gqbi.onrender.com/products", productDetails)
      .then((res) => {
        alert("Product added!");
        setProductList([...productList, res.data]);
        toggleModal();
        setProductDetails({
          vendorId,
          name: "",
          price: "",
          category: "",
          stock: "",
          discount: "",
          image: "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add product.");
      });
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`https://gocart-gqbi.onrender.com/products/${productId}`)
      .then(() => {
        setProductList(productList.filter((p) => p._id !== productId));
        alert("Product deleted!");
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    axios.put(`https://gocart-gqbi.onrender.com/orders/${orderId}`, { status: newStatus })
      .then(() => {
        alert(`Order marked as ${newStatus}`);
        setOrderList(orderList.filter(o => o._id !== orderId));
      })
      .catch((err) => {
        console.error("Status update failed:", err);
        alert("Failed to update order status.");
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center px-6">
        <Link to="/" className="flex items-center">
          <img src="/image.png" alt="GoCart Logo" className="w-10 h-10 mr-2" />
          <span className="text-xl font-bold text-green-700">GoCart Dashboard</span>
        </Link>
        <div className="flex items-center space-x-4">
          <IoSearch className="text-gray-600 text-xl cursor-pointer" />
          <Link to="/profile">
            <FaUserCircle className="text-gray-700 text-2xl hover:text-green-700" />
          </Link>
        </div>
      </div>

      {/* Shop Info */}
      <div className="p-6 bg-white rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Shop Information</h2>
        <div><label>Shop Name:</label> {vendorData?.shopName || 'N/A'}</div>
        <div><label>Address:</label> {vendorData?.address || 'N/A'}</div>
        <div><label>Owner Name:</label> {vendorData?.name || 'N/A'}</div>
        <div><label>Contact Number:</label> {vendorData?.mobile_number || 'N/A'}</div>
        {orderFilter === "pending" && (
          <div className="mt-2 text-sm text-red-600 font-semibold">
            Total Pending Items: {pendingCount}
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => fetchOrders("pending")}
          className={`bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg ${orderFilter === "pending" ? "border border-red-500" : ""}`}
        >
          <h4 className="text-lg mb-2">Pending Orders</h4>
          <div className="text-red-500 text-2xl font-bold">{orderFilter === "pending" ? orderList.length : 0}</div>
        </div>
        <div
          onClick={() => fetchOrders("completed")}
          className={`bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg ${orderFilter === "completed" ? "border border-green-500" : ""}`}
        >
          <h4 className="text-lg mb-2">Completed Orders</h4>
          <div className="text-green-500 text-2xl font-bold">{orderFilter === "completed" ? orderList.length : (vendorData?.completedOrders || 0)}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-lg mb-2">Total Earnings</h4>
          <div className="text-blue-500 text-2xl font-bold">₹{orderFilter === "completed" ? totalEarnings : (vendorData?.earnings || 0)}</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h4 className="text-lg mb-2">Payment Status</h4>
          <FaCheckCircle className={`text-3xl mx-auto ${vendorData?.paymentStatus === "Pending" ? "text-red-500" : "text-green-500"}`} />
          <div className={`text-lg font-semibold ${vendorData?.paymentStatus === "Pending" ? "text-red-500" : "text-green-600"}`}>
            {vendorData?.paymentStatus || "Unknown"}
          </div>
        </div>
      </div>

      {/* Orders List */}
      {orderFilter && (
        <div className="bg-white shadow-md rounded p-6 my-4">
          <h3 className="text-xl font-semibold mb-4 capitalize">{orderFilter} Orders</h3>
          {orderList.length ? (
            <table className="w-full table-auto text-left border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Product Name</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Amount</th>
                  {orderFilter === "pending" && <th className="p-2 border">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {orderList.map((order, index) =>
                  order.products.map((i, idx) => (
                    <tr key={`${order._id}-${idx}`}>
                      <td className="p-2 border">{index + 1}.{idx + 1}</td>
                      <td className="p-2 border">{i.productId.name}</td>
                      <td className="p-2 border">{i.quantity}</td>
                      <td className="p-2 border">₹{i.productId?.price * i.quantity}</td>
                      {orderFilter === "pending" && (
                        <td className="p-2 border text-red-600 capitalize">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateOrderStatus(order._id, "completed")}
                              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order._id, "cancelled")}
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No {orderFilter} orders found.</p>
          )}
        </div>
      )}

      {/* Add Product Button */}
      <div className="text-center my-6">
        <button onClick={toggleModal} className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-green-700">
          <FaPlusCircle className="inline-block mr-2" /> Add New Product
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              {["name", "price", "category", "stock", "discount", "image"].map((field) => (
                <input
                  key={field}
                  type={["price", "stock", "discount"].includes(field) ? "number" : "text"}
                  name={field}
                  value={productDetails[field]}
                  onChange={handleInputChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full p-2 border rounded mb-3"
                  required={["name", "price"].includes(field)}
                />
              ))}
              <div className="flex justify-between">
                <button onClick={toggleModal} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
                <button onClick={handleSubmitProduct} className="bg-green-600 text-white py-2 px-4 rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">Product Listing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList.length > 0 ? (
            productList.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
                )}
                <h4 className="text-lg font-bold">{product.name}</h4>
                <p className="text-sm text-gray-600">₹{product.price}</p>
                <p className="text-sm text-gray-600">Category: {product.category}</p>
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                <p className="text-sm text-gray-600">Discount: {product.discount}%</p>
                <div className="flex justify-end mt-4 space-x-2">
                  <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700">
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
