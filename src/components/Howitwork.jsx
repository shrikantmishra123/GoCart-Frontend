import React from "react";
import { FaUserPlus, FaShoppingCart, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaUserPlus size={40} className="text-green-600" />, // Vendor Step
    title: "For Vendors",
    description: "Register → List Products → Start Selling",
  },
  {
    icon: <FaShoppingCart size={40} className="text-blue-600" />, // Consumer Step
    title: "For Consumers",
    description: "Browse → Order → Get Delivery",
  },
  {
    icon: <FaTruck size={40} className="text-red-600" />, // Transporter Step
    title: "For Transporters",
    description: "Accept Jobs → Transport → Get Paid",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <motion.h2
        className="text-4xl font-bold text-gray-800 mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        How GoCart Works?
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-10 px-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 max-w-sm w-full md:w-1/3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
