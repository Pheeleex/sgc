'use client'
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Button } from './ui/button';

export default function Hero() {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  // Create a motion-enhanced Button component
const MotionButton = motion(Button);

  // Parallax effect for background
  const yOffset = useTransform(scrollY, [0, 300], [0, -50]);
  
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Newsletter animation
  const newsletterVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

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
        <section className="relative overflow-hidden">
          <motion.div 
            className={`w-full h-96 md:h-screen max-h-[700px] bg-cover bg-center transition-opacity duration-700 ${
              heroImageLoaded ? 'opacity-100' : 'opacity-0'
            }`} 
            style={{ 
              backgroundImage: `url('/Images/pinteresty11.jpg')`,
              y: prefersReducedMotion ? 0 : yOffset 
            }}
            initial={prefersReducedMotion ? false : { scale: 1.1 }}
            animate={prefersReducedMotion ? {} : { scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
              <div className="container mx-auto px-4">
                <motion.div 
                  className="max-w-lg md:ml-12 p-6 md:p-0"
                  initial="hidden"
                  animate={heroImageLoaded ? "visible" : "hidden"}
                  variants={prefersReducedMotion ? {} : {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.3
                      }
                    }
                  }}
                >
                  <motion.h2 
                    className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
                    variants={prefersReducedMotion ? {} : textVariants}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    Embrace your soft girl journey
                  </motion.h2>
                  <motion.p 
                    className="text-white/90 text-lg mb-6"
                    variants={prefersReducedMotion ? {} : textVariants}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                  >
                    Explore beauty, fashion, and wellness tips that celebrate your unique style and self-expression.
                  </motion.p>
                  <motion.div
                    variants={prefersReducedMotion ? {} : textVariants}
                    transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
                  >
                    <MotionButton
                      className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition-colors"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    >
                      Explore Now
                    </MotionButton>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Newsletter Section */}
        <motion.section 
          className="bg-rose-50 py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={prefersReducedMotion ? {} : newsletterVariants}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div 
                className="mb-4 md:mb-0"
                initial={prefersReducedMotion ? {} : { x: -20 }}
                whileInView={prefersReducedMotion ? {} : { x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-neutral-800">Join our newsletter</h3>
                <p className="text-neutral-600">Get the latest beauty insights delivered to your inbox</p>
              </motion.div>
              <motion.div 
                className="flex w-full md:w-auto max-w-md"
                initial={prefersReducedMotion ? {} : { x: 20 }}
                whileInView={prefersReducedMotion ? {} : { x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-l-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <MotionButton
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-r-md transition-colors"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  Subscribe
                </MotionButton>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}