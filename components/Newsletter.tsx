'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'
import { AsyncStatus, LoadingButton } from './ui/async-state';

const Newsletter = () => {
     const [submitState, setSubmitState] = useState<"idle" | "pending" | "success">("idle");
      const [email, setEmail] = useState('');
      const [emailError, setEmailError] = useState('');
      const [statusMessage, setStatusMessage] = useState<string | null>(null);
       const submitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
       const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prefersReducedMotion = useReducedMotion();
     // Improved newsletter animation
      const newsletterVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut" as const
          }
        }
      };

      // Email validation function
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);


       // Handle email submission
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          
          if (!email) {
            setEmailError('Please enter your email');
            setStatusMessage('We need your email before we can subscribe you.');
            return;
          }
          
          if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            setStatusMessage('That email address looks incomplete.');
            return;
          }
          
          setEmailError('');
          setSubmitState("pending");
          setStatusMessage("Subscribing you now...");
          
          if (submitTimeoutRef.current) {
            clearTimeout(submitTimeoutRef.current);
          }
          if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
          }

          submitTimeoutRef.current = setTimeout(() => {
            setSubmitState("success");
            setStatusMessage("Thanks for subscribing. Check your inbox soon.");
            setEmail('');
            
            resetTimeoutRef.current = setTimeout(() => {
              setSubmitState("idle");
              setStatusMessage(null);
            }, 5000);
          }, 1500);
        };
  return (
    <motion.section 
    id="newsletter"
    className="bg-gradient-to-b from-purple-50 to-white py-12 md:py-16"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={prefersReducedMotion ? undefined : newsletterVariants}
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
            {submitState === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full md:w-auto"
              >
                <AsyncStatus
                  className="w-full md:w-auto"
                  message={statusMessage}
                  tone="success"
                />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                className="w-full md:w-auto"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <form
                  className="flex flex-col gap-3"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col sm:flex-row w-full gap-2">
                    <div className="relative flex-grow">
                      <input 
                        type="email" 
                        value={email}
                        disabled={submitState === "pending"}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                          if (statusMessage) setStatusMessage(null);
                        }}
                        placeholder="Your email address" 
                        className={`w-full px-4 py-3 rounded-md border ${emailError ? 'border-red-300 focus:ring-red-500' : 'border-neutral-300 focus:ring-rose-500'} focus:outline-none focus:ring-2`}
                        aria-label="Email address"
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? "email-error" : undefined}
                      />
                      {emailError && (
                        <p id="email-error" className="text-red-500 text-sm mt-1">
                          {emailError}
                        </p>
                      )}
                    </div>
                    
                    <LoadingButton
                      type="submit"
                      isLoading={submitState === "pending"}
                      loadingText="Subscribing..."
                      className="primary-btn hover:bg-rose-900 text-white px-6 py-3 rounded-md transition-colors"
                    >
                      Subscribe
                    </LoadingButton>
                  </div>

                  <AsyncStatus
                    message={submitState === "pending" ? statusMessage : null}
                    tone="loading"
                  />
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </motion.section>
  )
}

export default Newsletter
