// src/pages/VendorDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlusCircle, FaUserCircle, FaCheckCircle, FaBoxOpen } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  const vendorId = JSON.parse(localStorage.getItem("vendor_id"));
  const [vendorData, setVendorData] = useState(null);
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
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

  useEffect(() => {
    if (vendorId) {
      axios.get(`https://gocart-gqbi.onrender.com/vendors/${vendorId}`)
        .then((res) => setVendorData(res.data.data))
        .catch((err) => console.error("Vendor fetch failed:", err));

      axios.get(`https://gocart-gqbi.onrender.com/products/${vendorId}`)
        .then((res) => setProductList(res.data.data))
        .catch((err) => console.error("Product fetch failed:", err));
    }
  }, [vendorId]);

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

  const handleShowOrders = () => {
    if (!showOrders) {
      axios.get("https://gocart-gqbi.onrender.com/orders")
        .then((res) => {
          const vendorOrders = res.data.data.filter(order => order.vendorId === vendorId && order.status === "pending");
          setOrderList(vendorOrders);
          setShowOrders(true);
        })
        .catch(err => console.error("Order fetch failed:", err));
    } else {
      setShowOrders(false);
    }
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
      </div>

      {/* Metrics */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={handleShowOrders} className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg">
          <h4 className="text-lg mb-2">Pending Orders</h4>
          <div className="text-red-500 text-2xl font-bold">{vendorData?.pendingOrders || 0}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-lg mb-2">Completed Orders</h4>
          <div className="text-green-500 text-2xl font-bold">{vendorData?.completedOrders || 0}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-lg mb-2">Total Earnings</h4>
          <div className="text-blue-500 text-2xl font-bold">₹{vendorData?.earnings || 0}</div>
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
      {showOrders && (
        <div className="bg-white shadow-md rounded p-6 my-4">
          <h3 className="text-xl font-semibold mb-4">Pending Orders</h3>
          {orderList.length ? (
            <table className="w-full table-auto text-left border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Product Name</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order, index) => (
                  <tr key={order._id}>
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{order.productName}</td>
                    <td className="p-2 border">{order.quantity}</td>
                    <td className="p-2 border">₹{order.totalPrice}</td>
                    <td className="p-2 border text-red-600 capitalize">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No pending orders found.</p>
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
