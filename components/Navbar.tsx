"use client";
import { ChevronDown, ChevronUp, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);


  const toggleMobileMenu = () => {
    setSearchOpen(false); // close search when opening menu
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setMobileMenuOpen(false); // close menu when opening search
    setSearchOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Search bar dropdown (always appears on top) */}
      {searchOpen && (
        <SearchBar onClose={() => setSearchOpen(false)} />
      )}

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <h1 className="text-2xl font-serif font-bold text-rose-600">Soft girl circle</h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-neutral-700 hover:text-rose-600 transition-colors">Home</Link>
              <a href="/#RecommendedProducts" className="text-neutral-700 hover:text-rose-600 transition-colors">Recommended Products</a>
              <Link href="/About" className="text-neutral-700 hover:text-rose-600 transition-colors">About</Link>
            </nav>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleSearch} className="text-neutral-700 hover:text-rose-600 transition-colors">
              <Search size={20} />
            </button>
            <button className="hidden md:flex text-neutral-700 hover:text-rose-600 transition-colors">
              <User size={20} />
            </button>
            <Button className="hidden md:flex text-neutral-700 hover:text-rose-600 transition-colors">
              <Heart size={20} />
            </Button>
            <button className="hidden md:flex text-neutral-700 hover:text-rose-600 transition-colors">
              <ShoppingBag size={20} />
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-neutral-700" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
  <div className="md:hidden bg-white border-t border-neutral-100 py-4">
    <div className="container mx-auto px-4 flex flex-col space-y-4">
      <a href="/" className="text-neutral-700 hover:text-rose-600 transition-colors py-2">Home</a>
      <a href="/#RecommendedProducts" className="text-neutral-700 hover:text-rose-600 transition-colors py-2">Recommended Products</a>
      <a href="/#Posts" className="text-neutral-700 hover:text-rose-600 transition-colors py-2">Recent Posts</a>
      <a href="/About" className="text-neutral-700 hover:text-rose-600 transition-colors py-2">About</a>

      {/* Categories Dropdown */}
      <div>
        <button
          onClick={() => setShowCategories((prev) => !prev)}
          className="w-full flex justify-between items-center text-neutral-700 hover:text-rose-600 transition-colors py-2"
        >
          <span className="font-semibold">Categories</span>
          {showCategories ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showCategories && (
          <div className="flex flex-col space-y-2 pl-4 mt-2">
            <Link href="/Categories/fashion" className="hover:text-rose-600 transition-colors">Fashion</Link>
            <Link href="/Categories/hair" className="hover:text-rose-600 transition-colors">Hair</Link>
            <Link href="/Categories/skin" className="hover:text-rose-600 transition-colors">Skin</Link>
            <Link href="/Categories/wellness" className="hover:text-rose-600 transition-colors">Wellness</Link>
          </div>
        )}
      </div>

      <div className="flex space-x-6 py-2">
        <button onClick={toggleSearch} className="text-neutral-700 hover:text-rose-600 transition-colors">
          <Search size={20} />
        </button>
        <button className="text-neutral-700 hover:text-rose-600 transition-colors">
          <User size={20} />
        </button>
        <button className="text-neutral-700 hover:text-rose-600 transition-colors">
          <Heart size={20} />
        </button>
        <button className="text-neutral-700 hover:text-rose-600 transition-colors">
          <ShoppingBag size={20} />
        </button>
      </div>
    </div>
  </div>
)}
    </header>
  );
};

export default Navbar;
