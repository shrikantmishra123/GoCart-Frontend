import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaPlusCircle, FaShoppingCart, FaUserCircle, FaDollarSign, FaBoxOpen, FaChartBar, FaCheckCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  // Sample vendor data
  const vendorData = {
    name: "Sharma Vegetable Mart",
    location: "Indore",
    rating: 4.5,
    status: "Approved",
    image: "/images/vendor1.jpg",
    earnings: 3500,
    pendingOrders: 2,
    completedOrders: 15,
    paymentStatus: "Pending",
  };

  // State for modal and product list
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({ name: "", price: "", description: "" });
  const [productList, setProductList] = useState([]);

  // Toggle Modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handle input change
  const handleInputChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Handle product submission
  const handleSubmitProduct = () => {
    if (productDetails.name && productDetails.price && productDetails.description) {
      setProductList([...productList, productDetails]);
      toggleModal();
      setProductDetails({ name: "", price: "", description: "" });
    }
  };

  // Handle product deletion
  const handleDeleteProduct = (index) => {
    const updatedList = productList.filter((_, i) => i !== index);
    setProductList(updatedList);
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

      {/* Main Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Orders & Earnings */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Pending Orders</h3>
          <p className="text-3xl font-bold text-red-500">{vendorData.pendingOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Completed Orders</h3>
          <p className="text-3xl font-bold text-green-500">{vendorData.completedOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Total Earnings</h3>
          <p className="text-3xl font-bold text-blue-500">₹{vendorData.earnings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Payment Status</h3>
          <FaCheckCircle className={`text-3xl ${vendorData.paymentStatus === "Pending" ? "text-red-500" : "text-green-500"}`} />
          <p className={`text-lg font-semibold ${vendorData.paymentStatus === "Pending" ? "text-red-500" : "text-green-600"}`}>
            {vendorData.paymentStatus}
          </p>
        </div>
      </div>

      {/* Add Product Button */}
      <div className="text-center my-6">
        <button onClick={toggleModal} className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-green-700">
          <FaPlusCircle className="inline-block mr-2" /> Add New Product
        </button>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" name="name" value={productDetails.name} onChange={handleInputChange} placeholder="Product Name" className="w-full p-2 border rounded mb-3" required />
              <input type="number" name="price" value={productDetails.price} onChange={handleInputChange} placeholder="Price" className="w-full p-2 border rounded mb-3" required />
              <textarea name="description" value={productDetails.description} onChange={handleInputChange} placeholder="Product Description" className="w-full p-2 border rounded mb-3" required></textarea>
              <div className="flex justify-between">
                <button onClick={toggleModal} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
                <button type="submit" onClick={handleSubmitProduct} className="bg-green-600 text-white py-2 px-4 rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Listing */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">Product Listing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList.length > 0 ? productList.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-bold">{product.name}</h4>
              <p className="text-sm text-gray-600">₹{product.price}</p>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => handleDeleteProduct(index)} className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
                <button className="text-yellow-500 hover:text-yellow-700">
                  <FaEdit />
                </button>
              </div>
            </div>
          )) : <p className="text-gray-500">No products available.</p>}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
