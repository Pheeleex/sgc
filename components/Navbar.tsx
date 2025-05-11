"use client";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";



const Navbar = () => {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
   <header className="sticky top-0 z-50 bg-white shadow-sm">
   <div className="container mx-auto px-4 py-4">
     <div className="flex items-center justify-between">
       <div className="flex items-center space-x-10">
         <h1 className="text-2xl font-serif font-bold text-rose-600">Soft girl circle</h1>
         
         {/* Desktop Navigation */}
         <nav className="hidden md:flex space-x-8">
           <Link href="./" className="text-neutral-700 hover:text-rose-600 transition-colors">Home</Link>
           <Link href="RecommendedProducts" className="text-neutral-700 hover:text-rose-600 transition-colors">
            Recommended Products
           </Link>
           <Link href="/About" className="text-neutral-700 hover:text-rose-600 transition-colors">About</Link>
         </nav>
       </div>
       
       {/* Icons */}
       <div className="flex items-center space-x-4">
         <button className="hidden md:flex text-neutral-700 hover:text-rose-600 transition-colors">
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
         <a href="#" className="text-neutral-700 hover:text-rose-600 transition-colors py-2">Home</a>
         <a href="#" className="text-neutral-700 hover:text-rose-600 transition-colors py-2">Fashion</a>
         <a href="#" className="text-neutral-700 hover:text-rose-600 transition-colors py-2">Hair</a>
         <a href="#" className="text-neutral-700 hover:text-rose-600 transition-colors py-2">Skin</a>
         <a href="#" className="text-neutral-700 hover:text-rose-600 transition-colors py-2">Wellness</a>
         <a href="#" className="text-neutral-700 hover:text-rose-600 transition-colors py-2">About</a>
         <div className="flex space-x-6 py-2">
           <button className="text-neutral-700 hover:text-rose-600 transition-colors">
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
