import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-10 px-5 md:px-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-bold">GoCart</h2>
          <p className="mt-3 text-gray-300">Connecting vendors, consumers, and transporters seamlessly.</p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-yellow-400">FAQ</Link></li>
          </ul>
        </div>
        
        {/* Social Media & Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-gray-300 mt-10 border-t border-gray-500 pt-5">
        <p>&copy; 2025 GoCart. All Rights Reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
