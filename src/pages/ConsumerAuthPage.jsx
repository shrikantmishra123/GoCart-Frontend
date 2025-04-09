import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Header2 from "../components/Header2";

const ConsumerAuthPage = () => {
  const [authData, setAuthData] = useState({
    name: "",
    mobile_number: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://gocart-gqbi.onrender.com/consumers",
        authData
      );
      console.log("User registered:", response.data.data);
      // Store consumer ID if needed
      localStorage.setItem("consumer_id", JSON.stringify(response.data.data._id));
      alert("Registered successfully!");
      navigate("/cusord"); // Redirect to orders or dashboard page
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-50 min-h-screen">
      {/* Header */}
      <Header2></Header2>

      {/* Auth Form */}
      <div className="flex items-center justify-center mt-10 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
            Consumer Signup
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={authData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="mobile_number"
              placeholder="Mobile Number"
              value={authData.mobile_number}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={authData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold"
            >
              Continue
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-green-700 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/consumer-login")}
            >
              Login here
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 bg-gray-900 text-gray-300 p-4 text-center text-xs">
        <p>© 2025 GoCart. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ConsumerAuthPage;
