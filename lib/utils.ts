import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  badge?: string;
  sale?: boolean;
  originalPrice?: number;
}


export const categories = [
    { name: 'fashion', imageUrl: 'Images/pinteresty5.jpg', description: 'Seasonal trends and timeless classics' },
    { name: 'haircare', imageUrl: '/Images/pinteresty1.jpg', description: 'Natural solutions for radiant hair' },
    { name: 'skincare', imageUrl: '/Images/pinteresty10.jpg', description: 'Routines for healthy, glowing skin' },
    { name: 'wellness', imageUrl: '/Images/pinteresty6.jpg', description: 'Holistic approaches to self-care' }
  ];

export  const allProducts: Product[] = [
      {
        id: 1,
        name: "Glow Essence Serum",
        description: "Hydrating serum with hyaluronic acid and vitamin C",
        price: 42.99,
        rating: 4.8,
        reviewCount: 124,
        image: "Images/glowserum.jpg",
        category: "skincare",
        badge: "Bestseller",
      },
      {
        id: 2,
        name: "Silk Repair Hair Mask",
        description: "Deep conditioning treatment for damaged hair",
        price: 28.5,
        rating: 4.9,
        reviewCount: 86,
        image: "Images/Silk Repair Hair Mask.jpg",
        category: "haircare",
      },
      {
        id: 3,
        name: "Dewy Skin Tint",
        description: "Lightweight foundation for natural coverage",
        price: 36.0,
        rating: 4.7,
        reviewCount: 209,
        image: "Images/Dewy Skin Tint.jpg",
        category: "wellness",
        badge: "New",
      },
      {
        id: 4,
        name: "Calm Mind Wellness Tea",
        description: "Herbal blend with lavender and chamomile",
        price: 18.99,
        rating: 4.6,
        reviewCount: 72,
        image: "Images/Calm Mind Wellness Tea.png",
        category: "wellness",
      },
      {
        id: 5,
        name: "Barrier Repair Moisturizer",
        description: "Ceramide-rich cream for sensitive skin",
        price: 46.0,
        rating: 4.9,
        reviewCount: 158,
        image: "Images/Barrier Repair Moisturizer.jpg",
        category: "skincare",
        sale: true,
        originalPrice: 58.0,
      },
      {
        id: 6,
        name: "Volume Boost Hair Spray",
        description: "Lightweight texturizing spray for body and shine",
        price: 24.5,
        rating: 4.5,
        reviewCount: 93,
        image: "Images/volumespary.png",
        category: "haircare",
      },
      {
        id: 7,
        name: "Rose Quartz Facial Roller",
        description: "Crystal facial massage tool for lymphatic drainage",
        price: 32.0,
        rating: 4.7,
        reviewCount: 117,
        image: "Images/rosequartsroller.jpg",
        category: "wellness",
      },
      {
        id: 8,
        name: "Satin Finish Lipstick",
        description: "Hydrating formula with long-lasting color",
        price: 22.0,
        rating: 4.8,
        reviewCount: 204,
        image: "Images/SatinLipstick.jpg",
        category: "wellness",
      },
    ];
  