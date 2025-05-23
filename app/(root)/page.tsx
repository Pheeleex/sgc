
import Banner from '@/components/Banner'
import FeaturedCategories from '@/components/FeaturedCategories'
import Hero from '@/components/Hero'
import Posts from '@/components/Posts'
import RecommendedProducts from '@/components/Products'
import RecentPosts from '@/components/RecentPosts'
import SocialMedia from '@/components/SocialMedia'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Hero />
      <FeaturedCategories />
      <Posts />
      <Banner />
      <RecommendedProducts />
      <SocialMedia />
      
    </div>
  )
}

export default page
