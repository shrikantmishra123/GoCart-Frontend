import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import Logo from "../images/logo.jpg"

const VendorsListPage = () => {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get("https://gocart-gqbi.onrender.com/vendors");
        setVendors(res.data.data || []); // ensure fallback in case data is undefined
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-6">
      
      <img src={Logo} onClick={()=> navigate("/")}  className="h-12 w-auto mr-2" />
      {/* 🔰 Page Header */}
      <h2 className="text-2xl mt-5 md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
        🛍️ Choose Your Preferred Vendor
      </h2> 

      {/* 📌 Vendors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {vendors.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">No vendors available.</p>
        ) : (
          vendors.map((vendor) => (
            <div
              key={vendor._id}
              className="relative bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* 🏷️ Vendor Tag */}
              <span className="absolute z-10 top-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Verified
              </span>

              {/* 🖼️ Vendor Image */}
              <div className="relative">
                <img
                  src={vendor.shop_image || "https://via.placeholder.com/300x200.png?text=No+Image"}
                  alt={vendor.shopName}
                  className="w-full h-48 object-cover rounded-lg transition-transform duration-500 transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 rounded-lg"></div>
              </div>

              {/* 📜 Vendor Details */}
              <h3 className="font-bold text-gray-900 mt-4 text-xl transition-colors duration-300 hover:text-green-600 cursor-pointer">
                {vendor.shopName}
              </h3>
              <p className="text-gray-600 text-sm flex items-center mt-2">
                <FaMapMarkerAlt className="mr-1 text-red-500" /> {vendor.address}
              </p>

       
              {/* Category (static) */}
              <div className="flex gap-2">
                <span className="mt-2 text-sm text-white bg-blue-500 px-3 py-1 rounded-full font-semibold">{vendor.name}</span>
                <span className="mt-2 text-sm text-white bg-blue-500 px-3 py-1 rounded-full font-semibold">{vendor.mobile_number}</span>
              </div>

              
              <button
                onClick={() => {localStorage.setItem("vendor_id", JSON.stringify(vendor._id));navigate(`/cusord?vendorId=${vendor._id}`)}}
                className="mt-6 flex items-center justify-center  bg-green-600 text-white text-center py-3 px-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105"
              >
                🛒 Visit Shop
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VendorsListPage;
