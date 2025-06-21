'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// Post Type
interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: CategoryId;
  date: string;
  readTime: string;
  authorImg: string;
  authorName: string;
}

// Category Types
type CategoryId = 'skincare' | 'haircare' | 'fashion' | 'beauty' | 'wellness' | 'all';

interface Category {
  id: CategoryId;
  label: string;
}

// Props
interface RecentPostsProps {
  selectedCategory?: CategoryId;
}

// Sample post data
const allPosts: Post[] = [
  // (your posts data exactly as you wrote it)
];

// Category color mapping
const categoryColors: Record<string, {
  bg: string;
  text: string;
  hover: string;
  button: string;
  border: string;
  light: string;
}> = {
  skincare: {
    bg: 'bg-pink-100',
    text: 'text-pink-800',
    hover: 'hover:bg-pink-200',
    button: 'bg-pink-600 hover:bg-pink-700',
    border: 'border-pink-200',
    light: 'bg-pink-50',
  },
  haircare: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    hover: 'hover:bg-purple-200',
    button: 'bg-purple-600 hover:bg-purple-700',
    border: 'border-purple-200',
    light: 'bg-purple-50',
  },
  fashion: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    hover: 'hover:bg-blue-200',
    button: 'bg-blue-600 hover:bg-blue-700',
    border: 'border-blue-200',
    light: 'bg-blue-50',
  },
  beauty: {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    hover: 'hover:bg-rose-200',
    button: 'bg-rose-600 hover:bg-rose-700',
    border: 'border-rose-200',
    light: 'bg-rose-50',
  },
  wellness: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    hover: 'hover:bg-green-200',
    button: 'bg-green-600 hover:bg-green-700',
    border: 'border-green-200',
    light: 'bg-green-50',
  },
};

const RecentPosts: React.FC<RecentPostsProps> = ({ selectedCategory = 'all' }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(selectedCategory);

  const categories: Category[] = [
    { id: 'all', label: 'All Posts' },
    { id: 'skincare', label: 'Skincare' },
    { id: 'haircare', label: 'Haircare' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'wellness', label: 'Wellness' },
  ];

  // Filter posts
  const filteredPosts = activeCategory === 'all'
    ? allPosts
    : allPosts.filter((post) => post.category === activeCategory);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Recent Articles</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our latest beauty insights, tips, and inspiration
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeCategory === category.id
                    ? category.id === 'all'
                      ? 'bg-gray-800 text-white'
                      : `${categoryColors[category.id]?.button || 'bg-gray-800'} text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`overflow-hidden rounded-xl shadow hover:shadow-lg transition-shadow duration-300 ${
                categoryColors[post.category]?.light || 'bg-white'
              }`}
            >
              {/* Post Image */}
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                    categoryColors[post.category]?.bg || 'bg-gray-100'
                  } ${categoryColors[post.category]?.text || 'text-gray-800'}`}
                >
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </span>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <Link href={`/posts/${post.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-300 mb-3">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                {/* Post Meta */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center">
                    <img
                      src={post.authorImg}
                      alt={post.authorName}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-700">{post.authorName}</span>
                  </div>
                  <div className="text-sm text-gray-500">{post.readTime}</div>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/posts/${post.id}`}
                  className={`mt-6 inline-block px-4 py-2 rounded text-sm font-medium ${
                    categoryColors[post.category]?.button || 'bg-gray-800'
                  } text-white transition-colors duration-300`}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
