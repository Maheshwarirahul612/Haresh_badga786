import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <h3 className="text-white text-3xl font-semibold">Guardify</h3>

        {/* Desktop Links Section */}
        <div className="space-x-8 hidden md:flex">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/Auth"
            className="text-white hover:text-blue-200 transition duration-300 ease-in-out"
          >
            Auth
          </Link>
          <Link
            to="/dashboard"
            className="text-white hover:text-blue-200 transition duration-300 ease-in-out"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Links Section (Toggle visibility) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition duration-300 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/Auth"
            className="text-white hover:text-blue-200 transition duration-300 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            Auth
          </Link>
          <Link
            to="/dashboard"
            className="text-white hover:text-blue-200 transition duration-300 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
