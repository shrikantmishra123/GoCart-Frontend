import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '/src/images/WhatsApp Image 2025-04-03 at 13.43.27_10b7e180.jpg';
    
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
        <Link to="/login" className="hidden md:block px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
          Login
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-green-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <MobileNavLink to="/" text="Home" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/about" text="About" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/contact" text="Contact" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/login" text="Login" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </nav>
  );
};

/* Styled NavLink */
const NavLink = ({ to, text }) => (
  <Link to={to} className="text-gray-900 font-medium hover:text-green-700 transition">
    {text}
  </Link>
);

/* Mobile NavLink */
const MobileNavLink = ({ to, text, onClick }) => (
  <Link to={to} onClick={onClick} className="block py-3 px-6 text-gray-900 hover:bg-green-100 transition">
    {text}
  </Link>
);

export default Navbar;
