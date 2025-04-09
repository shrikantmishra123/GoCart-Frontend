import axios from "axios";
import React, { useState } from "react";
import Header2 from "../components/Header2";


const VendorJoinPage = () => {
  const [vendorDetails, setVendorDetails] = useState({
    name: "",
    shopName: "",
    mobile_number: "",
    address: "",
    city: "",
    addhar_card: "",
    password: "",
    addhar_front_image: null,
    aadhar_back_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setVendorDetails({
        ...vendorDetails,
        [name]: files[0],
      });
    } else {
      setVendorDetails({
        ...vendorDetails,
        [name]: value,
      });
    }
  };

  const postData = () => {
    axios
      .post("https://gocart-gqbi.onrender.com/vendors", vendorDetails)
      .then((res) => alert(res.data.data))
      .catch((err) => alert(err));
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-50 min-h-screen p-8">
      <Header2></Header2>
      <div className="flex items-center mt-4 justify-center mb-10">
        
        <h2 className="text-4xl font-extrabold text-gray-900">
          🚀 Join as a Vendor
        </h2>
      </div>

      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
        <div>
          {/* Full Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={vendorDetails.name}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
              placeholder="Enter your full name"
            />
          </div>

          {/* Shop Name */}
          <div className="mb-6">
            <label htmlFor="shopName" className="block font-semibold mb-2">
              Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={vendorDetails.shopName}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
              placeholder="Enter your shop name"
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-6">
            <label htmlFor="mobile_number" className="block font-semibold mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile_number"
              name="mobile_number"
              value={vendorDetails.mobile_number}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
              placeholder="Enter mobile number"
            />
          </div>

          {/* Aadhar Number */}
          <div className="mb-6">
            <label htmlFor="addhar_card" className="block font-semibold mb-2">
              Aadhar Card Number
            </label>
            <input
              type="text"
              id="addhar_card"
              name="addhar_card"
              value={vendorDetails.addhar_card}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
              placeholder="Enter Aadhar number"
            />
          </div>

          {/* Password Field ✅ */}
          <div className="mb-6">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={vendorDetails.password}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
              placeholder="Create a strong password"
            />
          </div>

          {/* Address */}
          <div className="mb-6">
            <label htmlFor="address" className="block font-semibold mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={vendorDetails.address}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
              placeholder="Enter full address"
            />
          </div>

          {/* City */}
          <div className="mb-6">
            <label htmlFor="city" className="block font-semibold mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={vendorDetails.city}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
              placeholder="Enter city"
            />
          </div>

          {/* Aadhar Front */}
          <div className="mb-6">
            <label
              htmlFor="addhar_front_image"
              className="block font-semibold mb-2"
            >
              Aadhar Card (Front)
            </label>
            <input
              type="file"
              id="addhar_front_image"
              name="addhar_front_image"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-4 border rounded-lg"
            />
          </div>

          {/* Aadhar Back */}
          <div className="mb-6">
            <label
              htmlFor="aadhar_back_image"
              className="block font-semibold mb-2"
            >
              Aadhar Card (Back)
            </label>
            <input
              type="file"
              id="aadhar_back_image"
              name="aadhar_back_image"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-4 border rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={postData}
              type="button"
              className="bg-green-400 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer"
            >
              Submite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorJoinPage;
