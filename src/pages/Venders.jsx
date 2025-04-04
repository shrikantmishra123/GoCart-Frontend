import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

// 🏪 Sample Vendor Data
const vendors = [
  {
    id: 1,
    name: "Sharma Vegetable Mart",
    location: "Indore",
    rating: 4.5,
    tag: "Best Seller",
    image: "https://content.jdmagicbox.com/comp/jaipur/v2/0141px141.x141.211113010517.h1v2/catalogue/sharma-vegetables-and-fruits-vaishali-nagar-jaipur-pux9v4klts.jpg",
    category: "Vegetables",
  },
  {
    id: 2,
    name: "Ramesh Fruit Shop",
    location: "Bhopal",
    rating: 4.2,
    tag: "Fresh & Organic",
    image: "https://content.jdmagicbox.com/comp/raipur-chhattisgarh/j1/9999px771.x771.191014111559.b4j1/catalogue/ramesh-fruits-daily-needs-raipur-chhattisgarh-1yxdaadq4v.jpg",
    category: "Fruits",
  },
  {
    id: 3,
    name: "Fresh Farm Produce",
    location: "Ujjain",
    rating: 4.8,
    tag: "Top Rated",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz4d8Dlob9HeJ1OCloWzeBio58fZQtGmJKA&s",
    category: "Organic",
  },
];

const VendorsListPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-6">
      {/* 🔰 Page Header */}
      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
        🛍️ Choose Your Preferred Vendor
      </h2>

      {/* 📌 Vendors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="relative bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* 🏷️ Vendor Tag */}
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              {vendor.tag}
            </span>

            {/* 🖼️ Vendor Image with Overlay */}
            <div className="relative">
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-500 transform hover:scale-110"
              />
              {/* Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 rounded-lg"></div>
            </div>

            {/* 📜 Vendor Details */}
            <h3 className="font-bold text-gray-900 mt-4 text-xl transition-colors duration-300 hover:text-green-600 cursor-pointer">
              {vendor.name}
            </h3>
            <p className="text-gray-600 text-sm flex items-center mt-2">
              <FaMapMarkerAlt className="mr-1 text-red-500" /> {vendor.location}
            </p>

            {/* ⭐ Ratings */}
            <div className="flex items-center mt-2">
              <FaStar className="text-yellow-500" />
              <span className="text-gray-800 font-semibold ml-1">{vendor.rating}</span>
            </div>

            {/* Category Badge */}
            <span className="mt-2 text-sm text-white bg-blue-500 px-3 py-1 rounded-full font-semibold">{vendor.category}</span>

            {/* 🎯 CTA Button */}
            <Link
              to="/cusord"
              className="mt-6 block bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105"
            >
              🛒 Visit Shop
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorsListPage;
