import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-green-600 to-green-900 text-white px-6">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold md:text-6xl lg:text-7xl drop-shadow-lg"
      >
        Welcome to GoCart
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl drop-shadow-md"
      >
        Connecting Thela Vendors & Load Transporters Directly to Consumers
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4"
      >
        <Link
          to="/vendor-auth"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg transition"
        >
          Vendors Login
        </Link>

        <Link
          to="/venders"
          className="px-6 py-3 bg-white hover:bg-gray-200 text-green-700 font-bold rounded-lg shadow-lg transition"
        >
          Consumers Order Kare
        </Link>

        <Link
          to="/venders"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition"
        >
         Order Items 
        </Link>

        <Link
          to="/consumer-login"
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg shadow-lg transition"
        >
          Consumer Login / Signup
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
