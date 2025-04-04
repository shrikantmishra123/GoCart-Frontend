import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaShoppingBasket, FaMapMarkerAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaTruck className="text-green-600 text-4xl" />, 
    title: "Fast & Reliable Delivery", 
    description: "Get fresh fruits, vegetables, and groceries delivered to your doorstep quickly."
  },
  {
    icon: <FaShoppingBasket className="text-blue-600 text-4xl" />, 
    title: "Easy Vendor Onboarding", 
    description: "Street vendors can list their items and start selling online in just a few steps."
  },
  {
    icon: <FaMapMarkerAlt className="text-red-600 text-4xl" />, 
    title: "Real-time Location Tracking", 
    description: "Track vendors and transporters in real-time for a seamless experience."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose <span className="text-green-600">GoCart?</span></h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        We connect vendors, consumers, and transporters with a seamless digital experience.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 bg-white shadow-lg rounded-xl backdrop-blur-md border border-gray-200 flex flex-col items-center transition-all duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
