import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="bg-green-700 text-white py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Join the Future of Local Shopping & Transport!
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl mb-8 opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Vendors, Consumers & Transporters – Be a part of GoCart and experience seamless service like never before!
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Link
            to="/vendor-auth"
            className="bg-yellow-400 text-green-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
          >
            Join as Vendor
          </Link>
          <Link
            to="/venders"
            className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Order Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
