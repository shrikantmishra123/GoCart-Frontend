import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ConsumerOrderPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://gocart-gqbi.onrender.com/products")
      .then((res) => {
        if (res.data?.data) {
          setProducts(res.data.data);
        } else {
          console.error("Unexpected response format", res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load products", err);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/image.png" alt="GoCart Logo" className="w-10 h-10 mr-2" />
          <span className="text-xl font-bold text-green-700">GoCart</span>
        </Link>
      </header>

      {/* Product List */}
      <main className="px-4 md:px-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🛒 Available Products
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-600 text-sm">No products available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                {product.discount && (
                  <span className="absolute bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-28 object-cover rounded-md mb-2"
                />
                <h3 className="text-gray-800 font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                <p className="text-green-600 font-bold text-lg">
                  ₹{product.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-10 bg-gray-900 text-gray-300 p-4 text-center text-xs">
        © 2025 GoCart. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ConsumerOrderPage;
