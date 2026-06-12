'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import Newsletter from './Newsletter';
import Link from 'next/link';

export default function Hero() {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Enhanced parallax effect with better performance
  const yOffset = useTransform(scrollY, [0, 500], [0, -75]);


  // Improved text animation variants with better timing
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const heroContentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };



  // Proper image loading handling
  useEffect(() => {
    // If image is cached, it might already be loaded
    const backgroundImg = new Image();
    backgroundImg.src = '/Images/pinteresty11.jpg';

    // Check if already cached/loaded
    if (backgroundImg.complete) {
      setHeroImageLoaded(true);
      return;
    }

    // Wait for image to load
    backgroundImg.onload = () => setHeroImageLoaded(true);

    return () => {
      backgroundImg.onload = null;
    };
  }, []);




  return (
    <div>
      <main>
        {/* Hero Section with improved loading and accessibility */}
        <section className="relative overflow-hidden" aria-label="Hero banner">
          {/* Loading state */}
          {!heroImageLoaded && (
            <div className="w-full h-96 md:h-[80vh] max-h-[700px] bg-rose-50 flex items-center justify-center">
              <Loader2 className="h-12 w-12 text-rose-500 animate-spin" aria-label="Loading hero image" />
            </div>
          )}

          {/* Background with proper loading */}
          <motion.div
            ref={imageRef}
            className={`w-full h-96 md:h-[80vh] max-h-[700px] bg-cover bg-center transition-opacity duration-700 ${heroImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundImage: `url('/Images/pinteresty11.jpg')`,
              y: prefersReducedMotion ? 0 : yOffset
            }}
            initial={prefersReducedMotion ? false : { scale: 1.05 }}
            animate={prefersReducedMotion ? {} : { scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" as const }}
            aria-hidden={!heroImageLoaded}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  className="max-w-xl md:ml-12 p-6 md:p-0"
                  initial="hidden"
                  animate={heroImageLoaded ? "visible" : "hidden"}
                  variants={prefersReducedMotion ? undefined : heroContentVariants}
                >
                 
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight"
                    variants={prefersReducedMotion ? undefined : textVariants}
                  >
                    Build a softer life with structure, beauty, and intention
                  </motion.h1>

                  <motion.p
                    className="text-white/90 text-lg mb-8"
                    variants={prefersReducedMotion ? undefined : textVariants}
                  >
                    Read the blog, download practical guides, and discover curated
                    essentials that support your routines and rituals.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    variants={prefersReducedMotion ? undefined : textVariants}
                  >
                    <Link
                      href="/guides"
                      className="primary-btn text-white px-6 py-3 rounded-md transition-colors flex items-center gap-2"
                    >
                      Browse Guides <ArrowRight className="h-4 w-4" />
                    </Link>


                    <Link
                      href="/blog"
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/30 px-6 py-3 rounded-md transition-colors"
                    >
                      Read the Blog
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
        <Newsletter />
      </main>
    </div>
  );
}
