import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "../client";
import { components } from "@/components/NewComponents";
import SoftnessPost from "@/components/SoftnessPost";


interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
interface DefaultPost {
  _type: "post";
  postType: "default";
  title: string;
  mainImage?: any;
  content?: any;
  _updatedAt: string;
}

interface SoftnessPost {
  _type: "post";
  postType: "softness";
  title: string;
  subHeadline?: string;
   _updatedAt: string;
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
}

type BlogPost = DefaultPost | SoftnessPost;


const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;


const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function PostPage(props: PageProps) {
   const params = await props.params;

  // fetch post by slug
const post = await client.fetch<BlogPost>(POST_QUERY, { slug: params.slug });

  if (!post) return notFound();

  const publishedDate = new Date(post._updatedAt).toLocaleDateString();

  // Default blog post
  if (post.postType === "default") {
    const postImageUrl = post.mainImage
      ? urlFor(post.mainImage)?.width(1200).height(600).url()
      : null;

    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-6">
        <Link href="/blog" className="text-rose-600 hover:underline">
          ← Back to blog
        </Link>

        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl object-cover"
            width={1200}
            height={600}
          />
        )}

        <h1 className="text-4xl font-bold text-justify">{post.title}</h1>

        <div className="prose max-w-none prose-p:leading-relaxed prose-img:rounded-xl prose-img:shadow">
          <p className="text-sm text-gray-500">Published: {publishedDate}</p>

          {Array.isArray(post.content) && (
            <PortableText value={post.content} components={components} />
          )}
        </div>
      </main>
    );
  }

  // Custom layout for "softness" postType
  if (post.postType === "softness") {
    return <SoftnessPost post={post} />;
  }

  // Fallback for unknown postType
  return notFound();
}
