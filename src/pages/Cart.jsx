import React, { useEffect, useState } from "react";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const consumerId = localStorage.getItem("consumer_id");
    if (!consumerId) {
      navigate("/consumer-auth");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, [navigate]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const consumerId = JSON.parse(localStorage.getItem("consumer_id"));
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const vendorId = cartItems[0].vendorId;

    const orderData = {
      consumerId,
      vendorId,
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      status: "pending",
      totalPrice,
    };

    try {
      setLoading(true);
      const response = await axios.post("https://gocart-gqbi.onrender.com/orders", orderData);
      console.log("Order placed:", response.data.data);

      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed successfully!");
      navigate("/cusord");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <Link to="/cusord" className="flex items-center text-green-600 hover:text-green-700 mb-4">
        <FaArrowLeft className="mr-2" /> Continue Shopping
      </Link>

      <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b py-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-grow px-3">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-green-600 font-bold">₹{item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 bg-white border">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="ml-3 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 md:p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">Total: ₹{totalPrice}</h3>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`mt-3 w-full py-2 rounded-lg text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Placing Order..." : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
