import React, { useEffect, useState } from "react";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const consumerId = localStorage.getItem("consumer_id");
    if (!consumerId) {
      navigate("/consumer-login");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const consumerProfile = JSON.parse(localStorage.getItem("consumer_profile"));
    if (consumerProfile?.address) {
      setAddress(consumerProfile.address);
    }
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
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const itemTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const gst = itemTotal * 0.08;
  const deliveryCharge = itemTotal > 199 ? 0 : 23;
  const totalPrice = itemTotal + gst + deliveryCharge;

  const handleCheckout = async () => {
    const consumerId = JSON.parse(localStorage.getItem("consumer_id"));
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    const vendorId = cartItems[0].vendorId;

    const orderData = {
      consumerId,
      vendorId,
      address,
      status: "pending",
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalPrice,
    };

    try {
      setLoading(true);
      await axios.post("https://gocart-gqbi.onrender.com/orders", orderData);
      localStorage.removeItem("cart");
      setCart([]);
      setOrderSuccess(true);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse`,
            {
              params: {
                format: "jsonv2",
                lat: latitude,
                lon: longitude,
              },
            }
          );

          const fullAddress = response.data.display_name;
          if (fullAddress) {
            setAddress(fullAddress);
          } else {
            alert("Unable to fetch address from location.");
          }
        } catch (error) {
          console.error("Error fetching location address:", error);
          alert("Failed to retrieve address from coordinates.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to get current location.");
      }
    );
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen p-4 md:p-6">
      <header className="text-center text-3xl md:text-4xl font-bold text-green-700 mb-6">
        GO cart 🛒
      </header>

      <Link
        to="/cusord"
        className="flex items-center text-green-700 hover:text-green-800 mb-4 font-medium"
      >
        <FaArrowLeft className="mr-2" /> Continue Shopping
      </Link>

      {orderSuccess ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🎉 Order Placed Successfully!
          </h2>
          <p className="text-gray-700 text-lg">
            Your order will be delivered to:
          </p>
          <p className="text-gray-900 font-semibold mt-2 mb-4">{address}</p>
          <p className="text-sm text-gray-500">Estimated Delivery Time</p>
          <p className="text-xl font-bold text-emerald-500">⏰ 15 Minutes</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
          >
            🔙 Back to Home
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Your Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-600 text-center">Your cart is empty.</p>
          ) : (
            <>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-grow px-3">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-green-600 font-bold">
                        ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 bg-white border">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r"
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

              {/* Address & Total */}
              <div className="mt-6 p-4 md:p-6 bg-white rounded-lg shadow-md space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Delivery Address
                  </h3>
                  <div className="space-y-2">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your address here..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                    />
                    <button
                      onClick={fetchCurrentLocation}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm shadow"
                    >
                      📍 Use My Current Location
                    </button>
                  </div>
                </div>

                <div className="text-left text-gray-700 font-medium space-y-1">
                  <p>Item Total: ₹{itemTotal.toFixed(2)}</p>
                  <p>GST & Charges (8%): ₹{gst.toFixed(2)}</p>
                  <p>
                    Delivery Charges:{" "}
                    <span className={deliveryCharge === 0 ? "text-green-600 font-semibold" : ""}>
                      {deliveryCharge === 0
                        ? "0"
                        : `₹${deliveryCharge.toFixed(2)}`}
                    </span>
                    (Free delivery on orders above ₹199)
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    To Pay: ₹{totalPrice.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className={`mt-2 w-full py-2 rounded-lg text-white text-lg font-semibold shadow-md ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading ? "Placing Order..." : "Proceed to Checkout"}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
