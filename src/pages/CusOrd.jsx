import React, { useEffect, useState } from "react";
import { FaFilter, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConsumerOrderPage = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const vendorId = JSON.parse(localStorage.getItem("vendor_id"));
    axios
      .get(`https://gocart-gqbi.onrender.com/products/${vendorId}`)
      .then((res) => setProducts(res.data.data || []))
      .catch((err) => console.log(err));

    updateCartCount();
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isExist = cart.find((item) => item._id === product._id);

    let updatedCart;
    if (isExist) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount();
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
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

          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="text-gray-700 text-xl md:text-3xl hover:text-green-700 transition duration-200" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          <Link to="/profile">
            <FaUserCircle className="text-gray-700 text-xl md:text-3xl hover:text-green-700 transition duration-200" />
          </Link>
        </div>
      </div>

      {/* Products */}
      <div className="px-4 md:px-6 mt-6">
        {products.length > 0 && (
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3">
            🥦 {products[0].category}
          </h2>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">
              No products found for this vendor.
            </p>
          ) : (
            products.map((product) => (
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
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-600 text-white py-1 md:py-2 mt-2 md:mt-3 rounded-lg hover:bg-green-700 flex items-center justify-center transition duration-300"
                >
                  <FaShoppingCart className="mr-1 md:mr-2" /> ADD
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 md:mt-8 mx-4 md:mx-6 bg-blue-500 p-2 md:p-4 text-center text-white rounded-lg font-semibold shadow-lg">
        🚚 Get FREE delivery on your order above ₹199
      </div>

      <footer className="mt-6 md:mt-10 bg-gray-900 text-gray-300 p-4 md:p-6 text-center text-xs md:text-sm">
        <p>© 2025 GoCart. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ConsumerOrderPage;
