import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  BookOpen,
  Instagram,
  Mail,
  Youtube,
} from "lucide-react";
import { footerCategoryNavigation, footerQuickLinks } from "@/lib/site-navigation";


const Footer = async () => {

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold text-purple-100 mb-6">
              Soft girl circle
            </h3>
            <p className="text-neutral-400 mb-6">
              Empowering women through beauty, fashion, and wellness insights
              that celebrate individuality and self-expression.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://pin.it/2MpnYXYET"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-rose-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <Link
                href="/blog"
                className="text-neutral-400 hover:text-rose-400 transition-colors"
              >
                <BookOpen size={20} />
              </Link>
              <a
                href="https://pin.it/2MpnYXYET"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-rose-400 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              {footerCategoryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-rose-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-rose-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="flex items-start mb-4">
              <Mail
                size={20}
                className="text-rose-400 mr-4 mt-1 flex-shrink-0"
              />
              <p className="text-neutral-400">hello@softgirlcircle.com</p>
            </div>
            <p className="text-neutral-400 mb-6">
              Subscribe to our newsletter for weekly beauty tips and
              inspiration.
            </p>
            <p className="text-neutral-400 mb-6">
              As part of our commitment to transparency, we want you to know
              that we may earn a small commission from purchases made through
              the links on this page. This helps support our blog at no
              additional cost to you.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 transition-colors"
              >
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-neutral-700 bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 hover:text-white"
              >
                <Link href="/blog">Read the Blog</Link>
              </Button>
            </div>
            <Link
              href="/admin"
              className="mt-5 inline-flex text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-rose-400"
            >
              Admin
            </Link>
          </div>
        </div>
        <div className="border-t border-neutral-800 pt-8 mt-8 text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} SGC Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
