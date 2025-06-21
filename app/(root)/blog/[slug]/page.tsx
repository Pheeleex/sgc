import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "../client";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

export default async function PostPage(props: PageProps) {
  const params = await props.params;
 
  // fetch post by slug
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug: params.slug });

  if (!post) notFound(); // 404 if post not found

  // build image URL if mainImage exists
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(600).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl lg:w-4xl p-8 flex flex-col gap-6">
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
        <p className="text-sm text-gray-500">
          Published: {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        {Array.isArray(post.content) && <PortableText value={post.content} />}
      </div>
    </main>
  );
}
