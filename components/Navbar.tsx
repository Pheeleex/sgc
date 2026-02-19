import { LogOut, Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex justify-between align-center">
        <div className="leftside flex justify-between items-center space-x-10 p-4">
          <Link
            href="/"
            className="text-2xl font-serif font-bold primary"
          >
            Soft girl circle
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-neutral-700 hover:text-rose-600 transition-colors"
            >
              Home
            </Link>
            <a
              href="/#RecommendedProducts"
              className="text-neutral-700 hover:text-rose-600 transition-colors"
            >
              Recommended Products
            </a>
            <Link
              href="/About"
              className="text-neutral-700 hover:text-rose-600 transition-colors"
            >
              About
            </Link>

          </nav>
        </div>
        <NavbarClient />
      </div>
    </header>
  );
};

export default Navbar;
