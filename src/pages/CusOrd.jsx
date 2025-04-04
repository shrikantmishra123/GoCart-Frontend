import React, { useEffect, useState } from "react";
import { FaFilter, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";

const ConsumerOrderPage = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    vendorId: "", // you can auto-fill this if you have logged-in vendor
    name: "",
    price: "",
    category: "",
    stock: "",
    discount: "",
    image: "",
  });

  const fetchProducts = () => {
    axios
      .get("https://gocart-gqbi.onrender.com/products")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    axios
      .post("https://gocart-gqbi.onrender.com/products", newProduct)
      .then((res) => {
        alert("Product added!");
        setShowForm(false);
        fetchProducts(); // Refresh the list
      })
      .catch((err) => alert("Error: " + err.message));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 🏷️ Header */}
      <div className="bg-white shadow-md p-3 flex justify-between items-center px-4 md:px-6">
        <Link to="/" className="flex items-center">
          <img
            src="/image.png"
            alt="GoCart Logo"
            className="w-9 h-9 md:w-12 md:h-12 mr-2"
          />
          <span className="text-lg md:text-xl font-bold text-green-700">
            GoCart
          </span>
        </Link>
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 pl-10 rounded-lg focus:ring-2 focus:ring-green-500 outline-none w-full max-w-[180px] md:max-w-[250px]"
            />
            <IoSearch className="absolute left-3 top-3 text-gray-500 text-lg" />
          </div>
          <FaFilter className="text-gray-600 text-lg md:text-2xl cursor-pointer hover:text-green-600 transition duration-200" />
          <Link to="/profile">
            <FaUserCircle className="text-gray-700 text-xl md:text-3xl hover:text-green-700 transition duration-200" />
          </Link>
        </div>
      </div>

      {/* ➕ Add Product Button */}
      <div className="px-4 mt-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "➕ Add Product"}
        </button>
      </div>

      {/* 🧾 Add Product Form */}
      {showForm && (
        <div className="max-w-md mx-4 mt-4 bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            name="vendorId"
            placeholder="Vendor ID"
            value={newProduct.vendorId}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            value={newProduct.discount}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleAddProduct}
          >
            Submit Product
          </button>
        </div>
      )}

      {/* 🛒 Product Section */}
      <div className="px-4 md:px-6 mt-6">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3">
          🥦 Vegetables & Fruits
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-3 md:p-4 rounded-lg shadow-md relative transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {product.discount}% OFF
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-28 sm:h-36 md:h-40 object-cover rounded-md"
              />
              <h3 className="font-semibold mt-2 md:mt-3 text-gray-800 text-sm md:text-base">
                {product.name}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm">
                {product.category}
              </p>
              <p className="text-green-600 font-bold text-sm md:text-base">
                ₹{product.price}
              </p>
              <p className="text-gray-500 text-xs">In Stock: {product.stock}</p>
              <button className="w-full bg-green-600 text-white py-1 md:py-2 mt-2 md:mt-3 rounded-lg hover:bg-green-700 flex items-center justify-center transition duration-300">
                <FaShoppingCart className="mr-1 md:mr-2" /> ADD
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🚚 Free Delivery Banner */}
      <div className="mt-5 md:mt-8 mx-4 md:mx-6 bg-blue-500 p-2 md:p-4 text-center text-white rounded-lg font-semibold shadow-lg">
        🚚 Get FREE delivery on your order above ₹199
      </div>

      {/* 📍 Footer */}
      <footer className="mt-6 md:mt-10 bg-gray-900 text-gray-300 p-4 md:p-6 text-center text-xs md:text-sm">
        <p>© 2025 GoCart. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ConsumerOrderPage;
