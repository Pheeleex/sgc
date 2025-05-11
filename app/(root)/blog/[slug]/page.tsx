import Link from 'next/link';
import {
  Calendar, Clock, Tag, ChevronLeft,
} from 'lucide-react';
import { featuredPosts } from '@/lib/data/blog';
import { InteractionBar } from '@/components/InteractionBar';
import React, { FC } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
}

export default async function BlogPostPage({ params }: PageProps) { 
  
  const post: Post | undefined =  featuredPosts.find((p) => p.slug === params.slug);
  const currentPost: Post = post || featuredPosts[0];

 

  const relatedPosts = featuredPosts
    .filter((p) => p.id !== currentPost.id)
    .slice(0, 2);

    const formatContent = (content: string): React.ReactNode=> {
        const paragraphs = content.split('\n\n');
      
        return paragraphs.map((para, idx) => {
          // Handle numbered lists
          if (/^\d+\.\s/.test(para)) {
            const listItems = para.match(/\d+\.\s.*?(?=(\d+\.|$))/gs);
      
            return (
              <ol key={idx} className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
                {listItems?.map((item, i) => {
                  const cleanedItem = item.replace(/^\d+\.\s/, '').trim();
                  return <li key={i}>{cleanedItem}</li>;
                })}
              </ol>
            );
          }
      
          // Handle short headers
          if (para.includes(':') && para.length < 50) {
            return (
              <h2 key={idx} className="text-2xl font-bold my-6 text-gray-900">
                {para}
              </h2>
            );
          }
      
          // Handle definition-style sub-items like "Ceramides: Help restore..."
          if (para.includes(':') && para.length > 50) {
            const parts = para.split('\n').map((line, i) => {
              if (line.includes(':')) {
                const [term, definition] = line.split(/:(.+)/);
                return (
                  <p key={i} className="mb-2">
                    <strong className="text-gray-900">{term.trim()}:</strong>{' '}
                    <span className="text-gray-700">{definition.trim()}</span>
                  </p>
                );
              }
              return <p key={i} className="mb-4 text-gray-700 leading-relaxed">{line}</p>;
            });
            return <div key={idx} className="mb-4">{parts}</div>;
          }
      
          // Default paragraph
          return (
            <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
              {para}
            </p>
          );
        });
      };
      
  const readTime: number = Math.max(1, Math.ceil(currentPost.content.split(' ').length / 200));

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition duration-200"
        >
          <ChevronLeft size={20} />
          <span className="ml-1">Back to all articles</span>
        </Link>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">

          {/* Hero Image */}
          <div className="relative h-80">
            <img
              src={currentPost.imageUrl}
              alt={currentPost.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
            <div className="absolute top-4 left-4">
              <span className="bg-indigo-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                {currentPost.category}
              </span>
            </div>
          </div>

          {/* Title & Meta */}
          <div className="px-8 pt-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{currentPost.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 text-sm mb-6 gap-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{currentPost.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{readTime} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-6 text-gray-700">
              {currentPost.excerpt}
            </blockquote>
          </div>

          {/* Article Content */}
          <article className="px-8 py-6">
            {formatContent(currentPost.content)}
          </article>

          {/* Interaction Bar */}
         
            <InteractionBar />
          {/* Tags */}
          <div className="px-8 py-4 border-t border-gray-100">
            <div className="flex items-start mb-2">
              <Tag size={16} className="text-gray-500 mr-2 mt-1" />
              <div className="flex flex-wrap gap-2">
                {[currentPost.category.toLowerCase(), 'blog', 'lifestyle'].map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs hover:bg-gray-200 cursor-pointer transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <div key={related.id} className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition">
                <img src={related.imageUrl} alt={related.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-xs font-bold uppercase text-indigo-600">{related.category}</span>
                  <h4 className="text-xl font-bold mt-2 mb-2 text-gray-900">{related.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{related.excerpt}</p>
                  <Link href={`/blog/${related.slug}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 bg-indigo-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Enjoy this article?</h3>
          <p className="text-gray-700 mb-6">Subscribe to our newsletter to get the latest content delivered to your inbox.</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow rounded-l-lg border-gray-200 border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white rounded-r-lg px-6 py-2 hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


