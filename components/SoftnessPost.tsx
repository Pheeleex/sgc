import Image from "next/image";

import { urlFor } from "@/app/(root)/blog/image";
import RecommendedProducts from "./RecommendedProductsSnity";

type SoftnessPostProps = {
  post: {
    title: string;
    subHeadline?: string;
    heroImage?: any;
    intro?: string;
    contentSections?: {
      heading?: string;
      body?: string;
      image?: any;
    }[];
    productHeader?: string;
     recommendedProducts?: {
      sectionTitle: string;
      products: {
        name: string;
        url: string;
        description?: string;
        image?: any;
      }[];
    }[];
    outro?: string;
  };
};

export default function SoftnessPost({ post }: SoftnessPostProps) {
  // Simple function to parse markdown-style links
  const parseLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      
      // Add the link
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="primary hover:text-rose-700 underline decoration-purple-300 hover:decoration-purple-500 transition-colors duration-200 font-medium active:text-Purple-800"
        >
          {match[1]}
        </a>
      );
      
      lastIndex = linkRegex.lastIndex;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <div className="max-w-4xl mx-auto px-3 py-6 sm:px-4 sm:py-8 lg:px-8 lg:py-12">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Hero Image */}
          {post.heroImage && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl">
              <Image
                src={urlFor(post.heroImage).width(1200).height(600).url()}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[500px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}

          {/* Title + SubHeadline */}
          <header className="text-center space-y-3 sm:space-y-4 lg:space-y-6 max-w-3xl mx-auto px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-black leading-tight">
              {post.title}
            </h1>
            {post.subHeadline && (
              <p className="text-base sm:text-lg md:text-xl text-black font-medium leading-relaxed">
                {post.subHeadline}
              </p>
            )}
          </header>
        </div>

        {/* Intro Section */}
        {post.intro && (
          <section className="mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10 shadow-md sm:shadow-lg border border-purple-50">
              <div className="prose prose-sm sm:prose-base lg:prose-lg prose-purple max-w-none leading-relaxed">
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  {parseLinks(post.intro)}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Content Sections */}
        {post.contentSections && post.contentSections.length > 0 && (
          <div className="mb-8 sm:mb-12 lg:mb-16 space-y-6 sm:space-y-8 lg:space-y-12">
            {post.contentSections.map((section, index) => (
              <section
                key={index}
                className="flex flex-col gap-4 sm:gap-6 lg:gap-8 items-center bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden p-4 sm:p-6 lg:p-10 border border-purple-50"
              >
                {/* Image - Always full width on mobile */}
                {section.image && (
                  <div className="w-full">
                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-sm sm:shadow-md">
                      <Image
                        src={urlFor(section.image).width(800).height(600).url()}
                        alt={section.heading || "Section image"}
                        width={800}
                        height={600}
                        className="w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                )}

                {/* Text Content */}
                <div className="w-full space-y-3 sm:space-y-4 lg:space-y-6">
                  {section.heading && (
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight">
                      {section.heading}
                    </h2>
                  )}
                  {section.body && (
                    <div className="prose prose-sm sm:prose-base lg:prose-lg prose-purple-300 max-w-none leading-relaxed">
                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                        {parseLinks(section.body)}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Outro Section */}
        {post.outro && (
          <section className="mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10 shadow-md sm:shadow-lg border border-purple-50">
              <div className="prose prose-sm sm:prose-base lg:prose-lg prose-emerald max-w-none leading-relaxed">
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  {parseLinks(post.outro)}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Affiliate Disclaimer */}
        {post.recommendedProducts && post.recommendedProducts.length > 0 && (
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <div className="bg-purple-50 border border-pink-300 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold primary mb-1">Affiliate Disclosure</h3>
                  <p className="text-xs sm:text-sm primary leading-relaxed">
                    Please note that none of the recommended products below are owned by the author. 
                    We may earn a commission from purchases made through these links at no additional cost to you. 
                    This helps support our content creation efforts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {post.recommendedProducts && (
          <section>
            <RecommendedProducts recommendedProducts={post.recommendedProducts} />
          </section>
        )}

      </div>
    </main>
  );
}