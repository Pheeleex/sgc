"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  isPrimaryNavigationActive,
  primaryNavigation,
} from "@/lib/site-navigation";
import { cn } from "@/lib/utils";

const NavbarClient = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
          {primaryNavigation.map((item) => {
            const isActive = isPrimaryNavigationActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "py-2 transition-colors",
                  isActive
                    ? "mt-1 rounded-full bg-rose-100 px-4 text-sm font-semibold text-rose-700 hover:bg-rose-200"
                    : "text-neutral-700 hover:text-rose-600"
                )}
                onClick={toggleMobileMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavbarClient;
