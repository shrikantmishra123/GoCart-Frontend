// src/pages/VendorLoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VendorLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://gocart-gqbi.onrender.com/vendors/login", formData)
      .then((res) => {
        console.log(res);

        // Save login data to localStorage

        localStorage.setItem("vendor_id", JSON.stringify(res.data.data._id));

        alert("Login Successful!");
        navigate("/vendordashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-40 p-10 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
        Vendor Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="mobile_number"
          placeholder="Mobile Number"
          value={formData.mobile_number}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VendorLoginForm;
