"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";

const NavbarClient = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="rightside flex  items-center space-x-2 md:space-y-0 md:flex-row md:items-center md:space-x-4">
      {/* Search bar button */}
      <SearchBar />

      {/* Hamburger Menu Button (Mobile Only) */}
      <button
        className="md:hidden text-neutral-700"
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 right-4 z-50 w-56 bg-white shadow-lg rounded-lg p-4 flex flex-col md:hidden animate-fade-in-down">
          <a
            href="/"
            className="text-neutral-700 hover:text-rose-600 transition-colors py-2"
            onClick={toggleMobileMenu}
          >
            Home
          </a>
          <a
            href="/#RecommendedProducts"
            className="text-neutral-700 hover:text-rose-600 transition-colors py-2"
            onClick={toggleMobileMenu}
          >
            Recommended Products
          </a>
          <a
            href="/#Posts"
            className="text-neutral-700 hover:text-rose-600 transition-colors py-2"
            onClick={toggleMobileMenu}
          >
            Recent Posts
          </a>
          <a
            href="/About"
            className="text-neutral-700 hover:text-rose-600 transition-colors py-2"
            onClick={toggleMobileMenu}
          >
            About
          </a>
        </div>
      )}
    </div>
  );
};

export default NavbarClient;
