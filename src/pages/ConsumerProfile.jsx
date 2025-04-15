import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConsumerProfile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [consumer, setConsumer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editData, setEditData] = useState({
    name: "",
    mobile_number: "",
    address: "",
  });
  const navigate = useNavigate();

  // Helper function to format date and time
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString(); // "4/14/2025, 4:20:00 PM"
  };

  // Fetch consumer data
  useEffect(() => {
    const consumerId = JSON.parse(localStorage.getItem("consumer_id"));
    if (!consumerId) {
      navigate("/consumer-login");
      return;
    }

    axios
      .get(`https://gocart-gqbi.onrender.com/consumers/${consumerId}`)
      .then((res) => {
        const data = res.data.data;
        setConsumer(data);
        setEditData({
          name: data.name,
          mobile_number: data.mobile_number,
          address: data.Address,
        });
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  // Fetch orders data when active tab is "orders"
  useEffect(() => {
    const consumerId = JSON.parse(localStorage.getItem("consumer_id"));
    if (activeTab === "orders") {
      axios
        .get(`https://gocart-gqbi.onrender.com/orders/consumer/${consumerId}`)
        .then((res) => setOrders(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [activeTab]);

  // Handle profile edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const consumerId = JSON.parse(localStorage.getItem("consumer_id"));

    axios
      .put(`https://gocart-gqbi.onrender.com/consumers/${consumerId}`, {
        ...editData,
        Address: editData.address,
      })
      .then((res) => {
        alert("Profile updated!");
        setConsumer(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/consumer-auth");
  };

  return (
    <div className="min-h-screen bg-[#fefefe] font-sans">
      {consumer ? (
        <div className="max-w-3xl mx-auto p-4">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#009C3C] text-white p-5 rounded-t-2xl shadow-md sticky top-0 z-10">
            <div>
              <h2 className="text-2xl font-bold">Hi, {consumer.name}</h2>
              <p className="text-sm">📞 {consumer.mobile_number}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-[#009C3C] font-semibold px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex justify-around bg-white shadow-md py-3 rounded-b-2xl">
            {["orders", "address", "edit"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize text-sm font-medium px-3 py-2 rounded-full ${
                  activeTab === tab
                    ? "bg-[#009C3C] text-white"
                    : "text-gray-700 hover:text-[#009C3C]"
                }`}
              >
                {tab === "edit" ? "Edit Profile" : tab}
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className="mt-6 bg-white shadow-md rounded-xl p-5 space-y-5">
            {activeTab === "orders" && (
              <>
                <h3 className="text-lg font-semibold text-[#009C3C]">
                  Your Orders
                </h3>
                {orders.length ? (
                  <div className="space-y-4">
                    {orders
                      .slice()
                      .reverse()
                      .map((order) => (
                        <div
                          key={order._id}
                          className="border border-gray-200 p-4 rounded-lg bg-[#f9f9f9]"
                        >
                          <p>
                            <strong>Status:</strong>{" "}
                            <span
                              className={`font-semibold ${
                                order.status === "completed"
                                  ? "text-green-600"
                                  : order.status === "cancelled"
                                  ? "text-red-500"
                                  : "text-yellow-600"
                              }`}
                            >
                              {order.status === "completed"
                                ? "Order Delivered ✔"
                                : order.status === "pending"
                                ? "Order Pending"
                                : order.status}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Address: {order.address}
                          </p>
                          <p className="text-sm text-gray-600">
                            Total: ₹{order.totalPrice}
                          </p>
                          <ul className="text-sm mt-2 text-gray-800">
                            {order.products.map((prod, idx) => (
                              <li key={idx}>
                                • {prod.productId.name} × {prod.quantity} - ₹
                                {prod.productId.price}
                              </li>
                            ))}
                          </ul>
                          {order.status === "completed" && (
                            <p className="text-sm text-gray-500 mt-2">
                              Delivered on: {formatDate(order.createdAt)}
                            </p>
                          )}
                          {order.status === "pending" && (
                            <p className="text-sm text-gray-500 mt-2">
                              Ordered on: {formatDate(order.createdAt)}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No orders placed yet.</p>
                )}
              </>
            )}

            {activeTab === "address" && (
              <>
                <h3 className="text-lg font-semibold text-[#009C3C]">
                  Your Address
                </h3>
                <div className="bg-gray-100 p-4 rounded-md border text-gray-700">
                  {consumer.Address || "No address added yet."}
                </div>
              </>
            )}

            {activeTab === "edit" && (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-[#009C3C]">
                  Update Profile
                </h3>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  value={editData.mobile_number}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      mobile_number: e.target.value,
                    })
                  }
                  placeholder="Mobile Number"
                />
                <textarea
                  rows={3}
                  className="w-full p-3 border rounded-md"
                  value={editData.address}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                  placeholder="Address"
                />
                <button
                  type="submit"
                  className="bg-[#009C3C] hover:bg-green-700 text-white px-5 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
          Loading profile...
        </div>
      )}
    </div>
  );
};

export default ConsumerProfile;
