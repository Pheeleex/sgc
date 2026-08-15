import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { TypedObject } from "sanity";

import CmsPost from "@/components/CmsPost";
import RichText from "@/components/RichText";
import { client } from "../client";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface BlogPost {
  _type: "post";
  postType?: "default" | "feature" | "guide" | "roundup" | "softness";
  layoutStyle?: "classic" | "editorial" | "spotlight";
  title: string;
  category?: string;
  date?: string;
  excerpt?: string;
  subHeadline?: string;
  mainImage?: unknown;
  heroImage?: unknown;
  intro?: string;
  content?: TypedObject[];
  contentSections?: {
    layout?: "text" | "imageLeft" | "imageRight" | "spotlight" | "checklist";
    eyebrow?: string;
    heading?: string;
    body?: string;
    image?: unknown;
    checklist?: string[];
    cta?: {
      heading?: string;
      text?: string;
      label?: string;
      link?: string;
    };
  }[];
  productHeader?: string;
  showAffiliateDisclosure?: boolean;
  recommendedProducts?: {
    sectionTitle: string;
    products: {
      name: string;
      url: string;
      description?: string;
      image?: unknown;
    }[];
  }[];
  outro?: string;
  _updatedAt: string;
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  "category": category->title
}`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function PostPage(props: PageProps) {
  const params = await props.params;
  const post = await client.fetch<BlogPost>(POST_QUERY, { slug: params.slug });

  if (!post) {
    return notFound();
  }

  const postType = post.postType ?? "default";
  const hasRichLayout =
    postType !== "default" ||
    post.layoutStyle !== "classic" ||
    Boolean(post.heroImage) ||
    Boolean(post.subHeadline) ||
    Boolean(post.intro) ||
    Boolean(post.contentSections?.length) ||
    Boolean(post.recommendedProducts?.length);

  if (!hasRichLayout) {
    const postImageUrl = post.mainImage
      ? urlFor(post.mainImage as SanityImageSource)?.width(1200).height(600).url()
      : null;
    const publishedDate = new Date(post.date || post._updatedAt).toLocaleDateString();

    return (
      <main className="container mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-8">
        <Link href="/blog" className="text-black hover:underline">
          ← Back to blog
        </Link>

        {postImageUrl ? (
          <img
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl object-cover"
            width={1200}
            height={600}
          />
        ) : null}

        <h1 className="text-4xl font-bold text-black text-justify">{post.title}</h1>

        <div>
          <p className="text-sm text-gray-500">Published: {publishedDate}</p>

          {Array.isArray(post.content) ? (
            <RichText className="mt-6" value={post.content} defaultImageAlt={post.title} />
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <CmsPost
      post={{
        ...post,
        category: post.category,
        date: post.date || post._updatedAt,
      }}
    />
  );
}
