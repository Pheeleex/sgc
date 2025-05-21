import Image from 'next/image';
import { allProducts } from '@/lib/utils';
import { featuredPosts } from '@/lib/data/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
    <div className="p-6">
      <h1 className="text-3xl font-bold capitalize mb-4">
        {slug.replace(/-/g, ' ')} Category
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Products</h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </section>


      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Blog Posts</h2>
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-56 sm:h-64 md:h-48 lg:h-56 xl:h-64">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`}>Read</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No blog posts found in this category.</p>
        )}
      </section>

    </div>
  );
}
