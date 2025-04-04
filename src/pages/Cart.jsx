import React, { useState } from "react";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartPage = () => {
  // 🛒 Initial Cart Items
  const [cart, setCart] = useState([
    { id: 1, name: "Banana", price: 30, quantity: 2, image: "https://dukaan.b-cdn.net/700x700/webp/projecteagle/images/f1892840-ac51-4f6d-8825-ce5b5f96ef8c.jpg" },
    { id: 2, name: "Coriander Bunch", price: 18, quantity: 1, image: "/images/coriander.jpg" },
  ]);

  // ➕ Increase Quantity
  const increaseQuantity = (id) => {
    setCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  // ➖ Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    ));
  };

  // ❌ Remove Item from Cart
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // 💰 Calculate Total Price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      {/* 🔙 Back Button */}
      <Link to="/cusord" className="flex items-center text-green-600 hover:text-green-700 mb-4">
        <FaArrowLeft className="mr-2" /> Continue Shopping
      </Link>

      <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          {/* 🏷️ Cart Items */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-grow px-3">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-green-600 font-bold">₹{item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l">-</button>
                  <span className="px-3 py-1 bg-white border">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r">+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className="ml-3 text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* 💰 Total & Checkout */}
          <div className="mt-4 p-4 md:p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">Total: ₹{totalPrice}</h3>
            <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
