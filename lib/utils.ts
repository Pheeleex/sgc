import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { defineQuery } from "next-sanity";

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
    { name: 'Lifestyle', imageUrl: 'Images/pinteresty5.jpg', description: 'The foundation of soft living: Faith, systems and intentional routines. Start your journey with planners, guides and resets' },
    { name: 'haircare', imageUrl: '/Images/pinteresty1.jpg', description: 'Gentle haircare rituals to support your soft living journey. Explore guides, checklists and routines' },
    { name: 'skincare', imageUrl: '/Images/pinteresty10.jpg', description: 'Intentional routines for glowing, nourished skin. Explore guides, checklists and routines' },
    { name: 'wellness', imageUrl: '/Images/pinteresty6.jpg', description: 'Mind-body practices that restore balance and calm. Explore guides, checklists and routines' }
  ];

export  const allProducts: Product[] = [
      {
        id: 1,
        name: "Collagen Select",
        description: "Hydrating serum with hyaluronic acid and vitamin CCollagen is basically your skin's scaffolding. Supplementing with collagen peptides has been shown to improve skin elasticity, hydration, and smoothness. Studies show a reduction in fine lines and wrinkles in as little as 4–12 weeks. Bonus: your skin might just start glowing like you've actually been getting enough sleep.,",
        price: 42.99,
        rating: 4.8,
        reviewCount: 124,
        image: "Images/collagen/collagenPack.jpg",
        category: "wellness",
        badge: "Bestseller",
      },
    ];
  
    export  const allGuides: Product[] = [
      {
        id: 1,
        name: "Collagen Select",
        description: "Hydrating serum with hyaluronic acid and vitamin CCollagen is basically your skin's scaffolding. Supplementing with collagen peptides has been shown to improve skin elasticity, hydration, and smoothness. Studies show a reduction in fine lines and wrinkles in as little as 4–12 weeks. Bonus: your skin might just start glowing like you've actually been getting enough sleep.,",
        price: 42.99,
        rating: 4.8,
        reviewCount: 124,
        image: "Images/collagen/collagenPack.jpg",
        category: "wellness",
        badge: "Bestseller",
      },
    ];



export const BLOG_LIST_QUERY = defineQuery(`*[
  _type == "post" && defined(slug.current)
]{
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  "category": category->title,
  date
} | order(date desc)`);

export const SOFTNESS_TYPE_PAGE_QUERY = defineQuery(`*[_type == "softnessTypePage"][0]{
  title,
  intro,
  subHeadline,
  heroImage,
  contentSections[]{
    heading,
    body,
    image
  },
  outro,
  recommendedProducts[]{
    sectionTitle,
    products[]{
      name,
      url,
      description,
      image
    }
  }
}`);


export const BLOG_AND_SOFTNESS_QUERY = defineQuery(`{
  posts: *[_type == "post" && defined(slug.current)] 
    | order(date desc){
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      "category": category->title,
      date
    },

  softnessPage: *[_type == "softnessTypePage"] 
    | order(date desc){
      title,
      intro,
      subHeadline,
      heroImage,
      contentSections[]{ heading, body, image },
      outro,
      recommendedProducts[]{
        sectionTitle,
        products[]{ name, url, description, image }
      },
      date
    }
}`);




export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${isoDateString}`);
  }

  const options: Intl.DateTimeFormatOptions = { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  };

 
  const formatted = date.toLocaleDateString('en-US', options);


  return formatted.replace(',', ',');
}


console.log(formatDate("2025-08-16T20:41:00.000Z"));
// 👉 "August, 16 2025"
