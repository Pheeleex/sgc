"use client";
import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/app/(root)/blog/image";
import Blogcard from "./Blogcard";

type AnimationSettings = {
  cardYOffset: number;
  staggerDelay: number;
  scaleEffect: number;
  transition: {
    duration?: number;
    type?: string;
    stiffness?: number;
    damping?: number;
    delay?: number;
  };
};

// Category colors mapping
const categoryColors: Record<string, string> = {
  fashion: "bg-pink-100 text-pink-600",
  healthcare: "bg-green-100 text-green-600",
  skincare: "bg-blue-100 text-blue-600",
  wellness: "bg-purple-100 text-purple-600",
};

const Posts = ({ posts = [] }: { posts: any[] }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const getAnimationSettings = (): AnimationSettings => {
    if (prefersReducedMotion) {
      return {
        cardYOffset: 0,
        staggerDelay: 0,
        scaleEffect: 1.01,
        transition: { duration: 0.3 },
      };
    }

    return isMobile
      ? {
          cardYOffset: 20,
          staggerDelay: 0.1,
          scaleEffect: 1.02,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          },
        }
      : {
          cardYOffset: 50,
          staggerDelay: 0.2,
          scaleEffect: 1.05,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2,
          },
        };
  };

  const animSettings = getAnimationSettings();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animSettings.staggerDelay,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: animSettings.cardYOffset,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: animSettings.transition,
    },
  };

  const imageVariants = {
    hover: {
      scale: isMobile ? 1.05 : 1.1,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleCardTap = (index: number) => {
    if (isMobile) {
      setHoveredCard(hoveredCard === index ? null : index);
    }
  };

  return (
    <section
      className="py-12 md:py-16 bg-neutral-100 overflow-hidden"
      id="Posts"
    >
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={prefersReducedMotion ? {} : containerVariants}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-serif font-semibold text-center mb-8 md:mb-12"
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }
          }
          whileInView={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
          }
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Latest Articles
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <Blogcard />
          {posts.map((post, index) => (
            <motion.div
              key={index}
              variants={prefersReducedMotion ? {} : cardVariants}
              onHoverStart={() => !isMobile && setHoveredCard(index)}
              onHoverEnd={() => !isMobile && setHoveredCard(null)}
              onTap={() => handleCardTap(index)}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      y: isMobile ? -5 : -10,
                      transition: { duration: isMobile ? 0.2 : 0.3 },
                    }
              }
              className="touch-manipulation"
            >
              <Card
                className={`overflow-hidden bg-white border-none shadow-md transition-shadow duration-300 rounded-2xl p-0 ${
                  hoveredCard === index && isMobile
                    ? "shadow-lg ring-2 ring-rose-300"
                    : "hover:shadow-xl"
                }`}
              >
                {/* Image Section */}
                <div className="relative">
                  <motion.div
                    className="w-full h-48 md:h-56 bg-rose-100"
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                  >
                    {post.mainImage ? (
                      <motion.img
                        src={urlFor(post.mainImage)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        variants={imageVariants}
                        whileHover="hover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                        No Image
                      </div>
                    )}
                  </motion.div>

                  {/* Category Badge */}
                  <motion.span
                    className={`absolute top-4 left-4 text-[11px] md:text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
                      categoryColors[post.category] ||
                      "bg-neutral-200 text-neutral-600"
                    }`}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { x: -20, opacity: 0 }
                    }
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { x: 0, opacity: 1 }
                    }
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {post.category}
                  </motion.span>
                </div>

                {/* Title & Meta */}
                <CardHeader className="px-4 md:px-6 pt-4 md:pt-6 pb-2">
                  <CardTitle className="font-serif text-lg md:text-xl font-semibold mb-2 text-neutral-800">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-neutral-400 text-xs md:text-sm">
                    {post.date}
                  </CardDescription>
                </CardHeader>

                {/* Excerpt */}
                <CardContent className="px-4 md:px-6 pb-3">
                  <p className="text-neutral-600 text-sm md:text-base line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>

                {/* CTA */}
                <CardFooter className="px-4 md:px-6 pb-4">
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      variant="link"
                      className="group px-0 text-rose-600 hover:text-rose-700 text-sm md:text-base font-medium flex items-center"
                    >
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="inline-block"
                      >
                        Read More
                      </Link>
                      <motion.div
                        animate={{
                          x:
                            hoveredCard === index || prefersReducedMotion
                              ? 0
                              : isMobile
                                ? 3
                                : 5,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <ChevronRight
                          size={isMobile ? 14 : 16}
                          className="ml-1 transition-transform group-hover:translate-x-1"
                        />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-8 md:mt-10"
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
          }
          whileInView={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
          }
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            whileHover={
              prefersReducedMotion ? {} : { scale: isMobile ? 1.03 : 1.05 }
            }
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          >
            <Link
              href="./blog"
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition-colors text-sm md:text-base"
            >
              View All Articles
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Posts;
