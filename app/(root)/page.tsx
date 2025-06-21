
import Banner from '@/components/Banner'
import FeaturedCategories from '@/components/FeaturedCategories'
import Hero from '@/components/Hero'
import Posts from '@/components/Posts'
import RecommendedProducts from '@/components/Products'
import RecentPosts from '@/components/RecentPosts'
import SocialMedia from '@/components/SocialMedia'
import React from 'react'
import { BLOG_LIST_QUERY } from '@/lib/utils'
import { sanityFetch } from './blog/live'

const page = async() => {
   const { data: posts } = await sanityFetch({ query: BLOG_LIST_QUERY });
   console.log(posts, 'posts')
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Hero />
      <FeaturedCategories />
      <Posts posts={posts} />
      <Banner />
      <RecommendedProducts />
      <SocialMedia />
      
    </div>
  )
}

export default page
