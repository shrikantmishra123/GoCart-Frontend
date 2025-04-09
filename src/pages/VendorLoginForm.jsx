// src/pages/VendorLoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header2 from "../components/Header2";

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
        const vendor = res.data.data;
        localStorage.setItem("vendor_id", JSON.stringify(vendor._id));
        localStorage.setItem("vendor_mobile", vendor.mobile_number);
        alert("Login Successful!");
        navigate("/vendordashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-50">   <Header2></Header2>
    <div className="max-w-md mx-auto mt-40 p-10 bg-[#EAF7F9] rounded-lg shadow">
    
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
      <div className="mt-4 text-sm text-center text-gray-600">
        Don’t have an account?
        <button onClick={()=> navigate('/vendorlogin')}
          className="text-green-700 font-medium hover:underline">
          Sign up here
        </button>
      </div>
    </div> </div>
  );
};

export default VendorLoginForm;
