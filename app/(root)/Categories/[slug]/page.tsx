import Image from 'next/image';
import { allProducts } from '@/lib/utils';
import { featuredPosts } from '@/lib/data/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage(props: PageProps) {
  const params = await props.params;
  const { slug } = await params;

  const filteredProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === slug
  );

  const filteredPosts = featuredPosts.filter(
    (post) => post.category.toLowerCase() === slug
  );

  return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Category Header */}
        <div className="mb-8 px-4 sm:px-0">
          <h1 className="text-4xl font-bold text-gray-900 capitalize mb-2 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text">
            {slug.replace(/-/g, ' ')}
          </h1>
          <div className="flex gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <span>/</span>
            <span className="capitalize">{slug.replace(/-/g, ' ')}</span>
          </div>
        </div>

        {/* Products Section */}
        <section className="mb-12 px-4 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <span className="text-sm text-gray-500">{filteredProducts.length} items</span>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-out"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                      alt={product.name}
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-indigo-600">${product.price}</span>
                      <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category</p>
            </div>
          )}
        </section>

        {/* Blog Posts Section */}
        <section className="px-4 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
            <span className="text-sm text-gray-500">{filteredPosts.length} posts</span>
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-out"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-sm text-indigo-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No blog posts found in this category</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
