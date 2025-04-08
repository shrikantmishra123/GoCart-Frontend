import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const ConsumerAuthPage = () => {
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Auth Data:", authData);
    // You can integrate your backend call here
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md p-3 flex justify-between items-center px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/image.png" alt="GoCart Logo" className="w-9 h-9" />
          <span className="text-lg font-bold text-green-700">GoCart</span>
        </Link>
        <FaUserCircle className="text-gray-700 text-2xl hover:text-green-700" />
      </div>

      {/* Auth Form */}
      <div className="flex items-center justify-center mt-10 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
            Consumer Login / Signup
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
              type="email"
              name="email"
              placeholder="Email Address"
              value={authData.email}
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
            <span className="text-green-700 font-medium cursor-pointer hover:underline">
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
