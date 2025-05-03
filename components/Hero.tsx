'use client'
import { useState, useEffect } from 'react';
import {
  Heart,
  ChevronRight,
  Instagram,
  Twitter,
  Youtube,
  BookOpen,
  Mail
} from 'lucide-react';
import { 
  //Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from './ui/button';

export default function Hero() {
const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  
  // Simulate image loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroImageLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

 

 

  return (
    <div>
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className={`w-full h-96 md:h-screen max-h-[700px] bg-cover bg-center transition-opacity duration-700 ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}`} 
               style={{ backgroundImage: `url('/Images/Pinteresty11.jpg')` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg md:ml-12 p-6 md:p-0">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                    Embrace your soft girl journey
                  </h2>
                  <p className="text-white/90 text-lg mb-6">
                    Explore beauty, fashion, and wellness tips that celebrate your unique style and self-expression.
                  </p>
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition-colors">
                    Explore Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="bg-rose-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-neutral-800">Join our newsletter</h3>
                <p className="text-neutral-600">Get the latest beauty insights delivered to your inbox</p>
              </div>
              <div className="flex w-full md:w-auto max-w-md">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-l-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Banner */}
       
        
        {/* Instagram Feed */}
       
      </main>
    </div>
  );
}