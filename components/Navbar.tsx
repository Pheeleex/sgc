import { LogOut, Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import NavbarClient from "./NavbarClient";
import { auth, signIn, signOut } from "@/app/auth";

const Navbar = async () => {
    const session = await auth();
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex justify-between align-center">
        <div className="leftside flex justify-between items-center space-x-10 p-4">
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-purple-900"
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

            <button className="hidden text-neutral-700 hover:text-rose-600 transition-colors">
              <User size={20} />
            </button>

             {session && session?.user ? (
            <>

              <form
              className="hidden"
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
            </>
          ) : (
            <form
            className="hidden"
              action={async () => {
                "use server";

                await signIn("google");
              }}
            >
              <button type="submit" className="hidden cursor-pointer">Login</button>
            </form>
          )}
          </nav>
        </div>
        <NavbarClient />
      </div>
    </header>
  );
};

export default Navbar;
