import Link from 'next/link';
import { Calendar, Clock, Tag, ChevronLeft } from 'lucide-react';
import { featuredPosts } from '@/lib/data/blog';
import { InteractionBar } from '@/components/InteractionBar';
import React, { FC } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CommentBox } from '@/components/CommentSection';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;
  const { slug } = await params; // Await the promise to get the resolved value

  const post: Post | undefined = featuredPosts.find((p) => p.slug === slug);  // Use `slug` directly
  const currentPost: Post = post || featuredPosts[0];


  if (!post) notFound(); // This triggers 404

  const relatedPosts = featuredPosts
    .filter((p) => p.id !== currentPost.id)
    .slice(0, 2);

  const formatContent = (content: string): React.ReactNode => {
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
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 text-sm sm:text-base transition-colors active:text-indigo-900"
        >
          <ChevronLeft size={20} className="w-5 h-5" />
          <span className="ml-1 whitespace-nowrap">Back to articles</span>
        </Link>

        <div className="bg-white shadow-lg rounded-xl overflow-y-scroll">

          {/* Hero Image */}
          <div className="relative aspect-video">
            <Image
              src={currentPost.imageUrl}
              alt={currentPost.title}
              className="w-full h-full object-cover"
              layout="fill"
              priority
              sizes="(max-width: 640px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent/20 to-black/60" />
            <div className="absolute top-3 left-3">
              <span className="bg-indigo-600/95 text-white text-xs font-semibold uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">
                {currentPost.category}
              </span>
            </div>
          </div>

          {/* Title & Meta */}
          <div className="px-5 sm:px-8 pt-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {currentPost.title}
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 text-gray-600 text-sm mb-6">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2 text-gray-500" />
                <span>{currentPost.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2 text-gray-500" />
                <span>{readTime} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            <blockquote className="border-l-3 border-indigo-500 pl-4 my-6 text-gray-700 italic bg-indigo-50/50 py-3 rounded-r">
              {currentPost.excerpt}
            </blockquote>
          </div>

          {/* Article Content */}
          <article className="px-5 sm:px-8 pb-8 prose prose-sm sm:prose-base max-w-none">
            {formatContent(currentPost.content)}
          </article>

          {/* Interaction Bar */}
          <InteractionBar />

          <CommentBox />

          {/* Tags */}
          <div className="px-5 sm:px-8 py-5 border-t border-gray-100">
            <div className="flex items-start">
              <Tag size={18} className="text-gray-500 mr-2 mt-1 flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                {[currentPost.category.toLowerCase(), 'blog', 'lifestyle'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors active:bg-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6 px-2">More to Read</h3>
          <div className="grid gap-5">
            {relatedPosts.map((related) => (
              <Link 
                key={related.id} 
                href={`/blog/${related.slug}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow active:shadow-sm"
              >
                <div className="relative aspect-video">
                  <Image
                    src={related.imageUrl}
                    alt={related.title}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                    {related.category}
                  </span>
                  <h4 className="text-lg font-semibold text-gray-900 mt-1 mb-2 group-hover:text-indigo-600 transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-2">{related.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 bg-indigo-50/80 rounded-xl p-6 text-center backdrop-blur-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Loved this article?</h3>
          <p className="text-gray-700 mb-5 text-sm sm:text-base">
            Get fresh content straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg border-gray-200 border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="w-full sm:w-auto bg-indigo-600 text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
