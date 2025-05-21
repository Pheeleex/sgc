'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { allProducts } from '@/lib/utils';

interface Category {
  id: string;
  label: string;
}


// Product categories
const categories: Category[] = [
  { id: 'all', label: 'All Products' },
  { id: 'skincare', label: 'Skincare' },
  { id: 'haircare', label: 'Haircare' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'wellness', label: 'Wellness' },
];

const RecommendedProducts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Sample product data - replace with your actual products
 
  const products = activeCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === activeCategory);

  const categoryStyles: Record<string, string> = {
    skincare: "bg-pink-600",
    haircare: "bg-purple-600",
    makeup: "bg-rose-600",
    wellness: "bg-green-600",
  };

  // Rating star renderer
  const renderStars = (rating: number) => {
    const stars: React.ReactNode[] = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (halfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <section id='RecommendedProducts' className="py-16 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative Elements */}
        <div className="absolute left-0 top-0 w-32 h-32 bg-pink-100 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
       

        {/* Section Header */}
        <div className="text-center mb-12 relative">
          <span className="text-sm font-medium text-pink-600 tracking-wider uppercase">Handpicked For You</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Best sellers</h2>
          <div className="w-24 h-1 bg-pink-600 rounded-full mx-auto mt-4" />
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of beauty and wellness products that we've tried, tested, and loved
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeCategory === category.id
                ? category.id === 'all'
                  ? 'bg-gray-800 text-white'
                  : `${categoryStyles[category.id as keyof typeof categoryStyles]} text-white`
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category.label}
          </button>
          ))}
        </div>

        {/* Products grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {products.map((product) => (
    <div
      key={product.id}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-pink-600 shadow-sm">
            {product.badge}
          </span>
        )}
        
        {/* Sale Ribbon */}
        {product.sale && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category Tag */}
        <span className={`${categoryStyles[product.category]} text-white px-2 py-1 rounded-full text-xs font-medium`}>
          {product.category}
        </span>

        <h3 className="mt-3 text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-2 text-gray-600 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          {product.sale ? (
            <>
              <span className="text-xl font-bold text-red-500">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-gray-400 line-through">
                ${product.originalPrice?.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
          Add to Cart
        </button>
      </div>

      {/* Quick View Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
        <button className="text-white font-medium bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full hover:bg-white/20 transition-all">
          Quick View
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
