import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '/src/images/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="GoCart Logo" className="h-12 w-auto mr-2" />
            <span className="text-2xl font-extrabold text-green-700">GoCart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" text="Home" />
            <NavLink to="/about" text="About" />
            <NavLink to="/contact" text="Contact" />
          </div>

          {/* Login Button */}
          <button
            onClick={() => setShowLoginPanel(true)}
            className="hidden md:block px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
          >
            Login
          </button>

          {/* Mobile Menu */}
          <button className="md:hidden text-green-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Links */}
        {isOpen && (
          <div className="md:hidden bg-white border-t shadow-md">
            <MobileNavLink to="/" text="Home" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/about" text="About" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/contact" text="Contact" onClick={() => setIsOpen(false)} />
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLoginPanel(true);
              }}
              className="w-full py-3 px-6 text-left text-green-700 hover:bg-green-100"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* Login Overlay Panel */}
      {showLoginPanel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="w-full max-w-2xl bg-green-700 rounded-lg shadow-lg p-10 text-white relative">
            <button
              onClick={() => setShowLoginPanel(false)}
              className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-4 text-center">Welcome to GoCart</h2>
            <p className="text-center mb-8 text-white/90 text-sm sm:text-base max-w-md mx-auto">
              Connecting Thela Vendors & Load Transporters Directly to Consumers
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={() => {
                  navigate("/vendor-auth");
                  setShowLoginPanel(false);
                }}
                className="bg-white text-green-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition"
              >
                Login as Vendor
              </button>
              <button
                onClick={() => {
                  navigate("/consumer-login");
                  setShowLoginPanel(false);
                }}
                className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg hover:bg-yellow-500 transition"
              >
                Login as Consumer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavLink = ({ to, text }) => (
  <Link to={to} className="text-gray-900 font-medium hover:text-green-700 transition">
    {text}
  </Link>
);

const MobileNavLink = ({ to, text, onClick }) => (
  <Link to={to} onClick={onClick} className="block py-3 px-6 text-gray-900 hover:bg-green-100 transition">
    {text}
  </Link>
);

export default Navbar;
