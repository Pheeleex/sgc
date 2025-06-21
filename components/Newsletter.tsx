'use client'
import React, { useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

const Newsletter = () => {
     const [isSubmitting, setIsSubmitting] = useState(false);
      const [email, setEmail] = useState('');
      const [emailError, setEmailError] = useState('');
      const [subscribed, setSubscribed] = useState(false);
       const emailInputRef = useRef<HTMLInputElement>(null);
    const prefersReducedMotion = useReducedMotion();
     // Improved newsletter animation
      const newsletterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }
      };

      // Email validation function
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };


       // Handle email submission
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          
          if (!email) {
            setEmailError('Please enter your email');
            return;
          }
          
          if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            return;
          }
          
          setEmailError('');
          setIsSubmitting(true);
          
          // Simulate API call
          setTimeout(() => {
            setIsSubmitting(false);
            setSubscribed(true);
            setEmail('');
            
            // Reset subscription status after 5 seconds
            setTimeout(() => {
              setSubscribed(false);
            }, 5000);
          }, 1500);
        };
  return (
    <motion.section 
    className="bg-gradient-to-b from-rose-50 to-white py-12 md:py-16"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={prefersReducedMotion ? {} : newsletterVariants}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-rose-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div 
            className="mb-4 md:mb-0 text-center md:text-left"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-neutral-800 mb-2">Stay inspired</h3>
            <p className="text-neutral-600">Get weekly beauty insights and exclusive content delivered to your inbox</p>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-green-50 text-green-700 px-4 py-3 rounded-md flex items-center justify-center w-full md:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Thanks for subscribing!
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                className="flex flex-col sm:flex-row w-full md:w-auto gap-2"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
              >
                <div className="relative flex-grow">
                  <input 
                    type="email" 
                    ref={emailInputRef}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="Your email address" 
                    className={`w-full px-4 py-3 rounded-md border ${emailError ? 'border-red-300 focus:ring-red-500' : 'border-neutral-300 focus:ring-rose-500'} focus:outline-none focus:ring-2`}
                    aria-label="Email address"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                  />
                  {emailError && (
                    <p id="email-error" className="text-red-500 text-sm mt-1 absolute">
                      {emailError}
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center"
                
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </motion.section>
  )
}

export default Newsletter
