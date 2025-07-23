'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

// Optional: Static version of category color
const categoryColor = 'bg-blue-100 text-blue-600'; // for "Beauty Blog"

const Blogcard = () => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="touch-manipulation"
    >
      <Link href="/blog/collagen-benefits" className="block group">
        <div className="overflow-hidden bg-white border-none shadow-md transition-shadow duration-300 rounded-2xl hover:shadow-xl">
          {/* Image Section */}
          <div className="relative h-48 md:h-52 lg:h-56 w-full">
            <motion.div
              className="w-full h-full bg-rose-100"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Image
                  src="/Images/collagen/collagen-skin-benefit-glowing.jpg"
                  alt="What is Collagen, and What Does It Do?"
                  fill
                  className="object-cover rounded-t-2xl"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>

            {/* Category Badge */}
            <motion.span
              className={`absolute top-4 left-4 text-[11px] md:text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${categoryColor}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Beauty Blog
            </motion.span>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-serif font-semibold mb-2 text-neutral-800 group-hover:text-blue-600 transition">
              What is Collagen, and What Does It Do?
            </h3>
            <p className="text-neutral-400 text-xs md:text-sm mb-2">
              June 28, 2025 • Beauty Blog
            </p>
            <p className="text-neutral-600 text-sm md:text-base line-clamp-3 leading-relaxed">
              Collagen is a crucial protein in the body responsible for youthful skin, strong joints, and healthy hair. Discover the benefits and how to boost it naturally.
            </p>

            {/* CTA */}
            <motion.div
              className="mt-4 flex items-center"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Button
                variant="link"
                className="group px-0 text-rose-600 hover:text-rose-700 text-sm md:text-base font-medium flex items-center"
              >
                <span>Read More</span>
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Blogcard;
