import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

const Posts = () => {
    const featuredPosts = [
        {
          title: 'Summer Capsule Wardrobe Essentials',
          category: 'Fashion',
          imageUrl: '/Images/fashion.jpg',
          date: 'April 30, 2025',
          excerpt: 'Build a versatile summer wardrobe with these ten timeless pieces that mix and match perfectly.'
        },
        {
          title: 'Natural Hair Masks for Different Hair Types',
          category: 'Hair Care',
          imageUrl: '/Images/Hair Care.jpg',
          date: 'April 25, 2025',
          excerpt: 'Discover DIY hair masks using kitchen staples that target specific hair concerns and types.'
        },
        {
          title: 'Understanding Skin Barrier Function',
          category: 'Skin Care',
          imageUrl: '/Images/skincare.jpg',
          date: 'April 22, 2025',
          excerpt: 'The science behind a healthy skin barrier and how to repair and maintain it for radiant skin.'
        }
      ];
  return (
    <section className="py-16 bg-neutral-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-serif font-semibold text-center mb-12">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle className="font-serif text-xl mb-2">{post.title}</CardTitle>
              <CardDescription className="text-neutral-500 text-sm">{post.date}</CardDescription>
            </CardHeader>
            <CardContent className="px-6 py-2">
              <p className="text-neutral-600 line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="px-6 py-4">
              <Button variant="link" className="px-0 text-rose-600 hover:text-rose-700 font-medium flex items-center">
                Read More <ChevronRight size={16} className="ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition-colors">
          View All Articles
        </Button>
      </div>
    </div>
  </section>
  )
}

export default Posts
