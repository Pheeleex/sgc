'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroCardSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Card data - replace with your actual content
  const cards = [
    {
      id: 1,
      category: 'Skincare',
      title: 'The Ultimate Guide to Hydrating Serums',
      description: 'Discover the best ingredients for plump, dewy skin all year round.',
      color: 'bg-pink-100',
      textColor: 'text-pink-800',
      buttonColor: 'bg-pink-600 hover:bg-pink-700',
      source: '/Images/pinteresty8.jpg'
    },
    {
      id: 2,
      category: 'Haircare',
      title: 'Natural Remedies for Shiny, Healthy Hair',
      description: 'Transform your locks with these simple, effective at-home treatments.',
      color: 'bg-purple-100',
      textColor: 'text-purple-800',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      source: '/Images/pinteresty9.jpg'
    },
    {
      id: 3,
      category: 'Fashion',
      title: 'Capsule Wardrobe Essentials for Spring',
      description: 'Build a versatile collection with these timeless, sustainable pieces.',
      color: 'bg-blue-100',
      textColor: 'text-blue-800',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      source: '/Images/pinteresty5.jpg'
    },
    {
      id: 4,
      category: 'Beauty',
      title: 'Minimal Makeup Looks for Everyday Glow',
      description: 'Achieve that perfect no-makeup makeup look in just five minutes.',
      color: 'bg-rose-100',
      textColor: 'text-rose-800',
      buttonColor: 'bg-rose-600 hover:bg-rose-700',
      source: '/Images/pinteresty7.jpg'
    },
    {
      id: 5,
      category: 'Wellness',
      title: 'Morning Rituals for Balanced Energy',
      description: 'Simple practices to center yourself and set intentions for the day.',
      color: 'bg-green-100',
      textColor: 'text-green-800',
      buttonColor: 'bg-green-600 hover:bg-green-700',
        source: '/Images/pinteresty6.jpg'
    }
  ];

  // Auto-slide function
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [cards.length]);

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-16 md:py-24">
      {/* Site Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block text-pink-600">Radiance</span>
          <span className="block text-2xl md:text-3xl mt-2 font-normal">Beauty & Wellness Journal</span>
        </h1>
      </div>
      
      {/* Card Slider Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Cards */}
        <div className="relative h-96 overflow-hidden rounded-2xl shadow-xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {cards.map((card) => (
              <div 
                key={card.id} 
                className="w-full flex-shrink-0 h-full flex"
                style={{ minWidth: '100%' }}
              >
                <div className={`${card.color} w-full flex flex-col md:flex-row overflow-hidden`}>
                  {/* Image Side */}
                  <div className="md:w-1/2 relative">
                    <Image
                      src={card.source}
                      width={500}
                        height={500}
                      alt={card.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${card.textColor} bg-white/80`}>
                        {card.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {card.title}
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                      {card.description}
                    </p>
                    <div className="mt-auto">
                      <Link href={`/posts/${card.id}`} className={`inline-block px-6 py-2 rounded-full text-white ${card.buttonColor} transition-colors duration-300`}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-gray-800 hover:bg-white transition-colors duration-300"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-gray-800 hover:bg-white transition-colors duration-300"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSlide === index ? 'bg-pink-600' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4">
        <Link href="/skincare" className="px-4 py-2 rounded-full text-sm font-medium bg-pink-100 text-pink-800 hover:bg-pink-200 transition-colors duration-300">
          Skincare
        </Link>
        <Link href="/haircare" className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-300">
          Haircare
        </Link>
        <Link href="/fashion" className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-300">
          Fashion
        </Link>
        <Link href="/beauty" className="px-4 py-2 rounded-full text-sm font-medium bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors duration-300">
          Beauty
        </Link>
        <Link href="/wellness" className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-300">
          Wellness
        </Link>
      </div>
    </div>
  );
};

export default HeroCardSlider;