"use client";

import Link from "next/link";
import React from "react";
import NavbarClient from "./NavbarClient";
import { usePathname } from "next/navigation";
import {
  isPrimaryNavigationActive,
  primaryNavigation,
} from "@/lib/site-navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        <div className="leftside flex items-center space-x-10">
          <Link
            href="/"
            className="text-2xl font-serif font-bold primary"
          >
            Soft girl circle
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {primaryNavigation.map((item) => {
              const isActive = isPrimaryNavigationActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-200"
                      : "text-neutral-700 hover:text-rose-600"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <NavbarClient />
      </div>
    </header>
  );
};

export default Navbar;
