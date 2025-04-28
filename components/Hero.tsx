// components/HeroSection.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroCardSlider from './HeroCardSlider';
import RecentPosts from './RecentPosts';
import RecommendedProducts from './Products';

const HeroSection = () => {
  return (
    <div className="relative bg-pink-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-pink-200 opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-purple-200 opacity-30"></div>
        <div className="absolute top-40 left-1/3 w-20 h-20 rounded-full bg-rose-200 opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
          {/* Content */}
          <div className="text-center md:max-w-3xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-pink-600">Radiance</span>
              <span className="block">Beauty & Wellness</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Your journey to glow from the inside out. Discover beauty secrets, wellness rituals, and self-care practices that nurture your body and soul.
            </p>
            
            {/* Category pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-pink-100 text-pink-800">Skincare</span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800">Haircare</span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">Fashion</span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-rose-100 text-rose-800">Beauty</span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">Wellness</span>
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/latest-posts" className="px-8 py-3 rounded-full text-base font-medium text-white bg-pink-600 hover:bg-pink-700 transition-colors duration-300">
                Latest Posts
              </Link>
              <Link href="/subscribe" className="px-8 py-3 rounded-full text-base font-medium text-pink-600 bg-white border border-pink-600 hover:bg-pink-50 transition-colors duration-300">
                Subscribe
              </Link>
            </div>
          </div>
          
          {/* Optional Featured Image */}
          <HeroCardSlider />
          <RecentPosts />
          <RecommendedProducts />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;