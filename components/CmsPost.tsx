import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { CalendarDays, ChevronLeft, Tag } from "lucide-react";
import type { TypedObject } from "sanity";

import { urlFor } from "@/app/(root)/blog/image";
import RichText from "@/components/RichText";
import RecommendedProducts from "@/components/RecommendedProductsSnity";

type ProductSection = {
  sectionTitle: string;
  products: {
    name: string;
    url: string;
    description?: string;
    image?: unknown;
  }[];
};

type ContentSection = {
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
};

type CmsPostProps = {
  post: {
    title: string;
    category?: string;
    date?: string;
    excerpt?: string;
    postType?: string;
    layoutStyle?: "classic" | "editorial" | "spotlight";
    subHeadline?: string;
    mainImage?: unknown;
    heroImage?: unknown;
    intro?: string;
    content?: TypedObject[];
    contentSections?: ContentSection[];
    productHeader?: string;
    recommendedProducts?: ProductSection[];
    outro?: string;
    showAffiliateDisclosure?: boolean;
  };
};

const markdownComponents = {
  p: ({ ...props }) => (
    <p className="leading-8 text-neutral-700 [&:not(:first-child)]:mt-4" {...props} />
  ),
  ul: ({ ...props }) => <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700" {...props} />,
  ol: ({ ...props }) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-neutral-700" {...props} />,
  li: ({ ...props }) => <li className="leading-7" {...props} />,
  h2: ({ ...props }) => <h2 className="mt-8 text-2xl font-semibold text-neutral-900" {...props} />,
  h3: ({ ...props }) => <h3 className="mt-6 text-xl font-semibold text-neutral-900" {...props} />,
  a: ({ ...props }) => (
    <a
      className="font-medium text-rose-600 underline decoration-rose-300 underline-offset-4 hover:text-rose-700"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className="mt-6 border-l-4 border-rose-300 bg-rose-50/70 px-5 py-4 italic text-neutral-700"
      {...props}
    />
  ),
};

const layoutTokens = {
  classic: {
    page: "bg-white",
    shell: "mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14",
    headerCard: "",
    sectionCard: "rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8",
    prose: "max-w-none",
  },
  editorial: {
    page: "bg-neutral-50",
    shell: "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12",
    headerCard:
      "rounded-[2rem] bg-white/95 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur sm:p-8 lg:p-10",
    sectionCard:
      "rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8 lg:p-10",
    prose: "max-w-none",
  },
  spotlight: {
    page: "bg-[#fff7f4]",
    shell: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12",
    headerCard:
      "rounded-[2rem] border border-rose-100 bg-white/95 p-6 shadow-lg shadow-rose-100/60 backdrop-blur sm:p-8 lg:p-10",
    sectionCard:
      "rounded-[2rem] border border-rose-100 bg-white/95 p-6 shadow-md shadow-rose-100/40 sm:p-8 lg:p-10",
    prose: "max-w-none",
  },
} as const;

function formatPublishedDate(value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function MarkdownBlock({
  value,
  className = "",
}: {
  value?: string;
  className?: string;
}) {
  if (!value) {
    return null;
  }

  return (
    <div className={className}>
      <ReactMarkdown components={markdownComponents}>{value}</ReactMarkdown>
    </div>
  );
}

function SectionCallToAction({
  cta,
}: {
  cta?: ContentSection["cta"];
}) {
  if (!cta?.link || (!cta.heading && !cta.text && !cta.label)) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/80 p-5">
      {cta.heading ? (
        <h3 className="text-lg font-semibold text-neutral-900">{cta.heading}</h3>
      ) : null}
      {cta.text ? <p className="mt-2 text-sm leading-6 text-neutral-700">{cta.text}</p> : null}
      <a
        href={cta.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
      >
        {cta.label || "Learn more"}
      </a>
    </div>
  );
}

function PostSection({
  section,
  index,
  sectionCardClass,
}: {
  section: ContentSection;
  index: number;
  sectionCardClass: string;
}) {
  const layout = section.layout || (index % 2 === 0 ? "imageRight" : "imageLeft");
  const imageUrl = section.image ? urlFor(section.image)?.width(900).height(700).url() : null;
  const showImage = Boolean(imageUrl) && layout !== "text" && layout !== "checklist";
  const isImageLeft = layout === "imageLeft";
  const isSpotlight = layout === "spotlight";
  const isChecklist = layout === "checklist";

  return (
    <section
      className={`${sectionCardClass} ${
        isSpotlight ? "bg-gradient-to-br from-white via-rose-50/70 to-white" : ""
      }`}
    >
      <div
        className={`grid gap-6 lg:items-center ${
          showImage ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]" : "grid-cols-1"
        }`}
      >
        {showImage && isImageLeft ? (
          <div className="order-1">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={imageUrl as string}
                alt={section.heading || "Section image"}
                width={900}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}

        <div className={`${showImage && isImageLeft ? "order-2" : "order-1"}`}>
          {section.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">
              {section.eyebrow}
            </p>
          ) : null}
          {section.heading ? (
            <h2 className="mt-3 font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {section.heading}
            </h2>
          ) : null}

          {isChecklist && section.checklist?.length ? (
            <ul className="mt-6 space-y-3">
              {section.checklist.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          <MarkdownBlock value={section.body} className="mt-5" />
          <SectionCallToAction cta={section.cta} />
        </div>

        {showImage && !isImageLeft ? (
          <div className="order-2">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={imageUrl as string}
                alt={section.heading || "Section image"}
                width={900}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function CmsPost({ post }: CmsPostProps) {
  const layoutStyle = post.layoutStyle || "classic";
  const tokens = layoutTokens[layoutStyle];
  const heroImage = post.heroImage || post.mainImage;
  const heroImageUrl = heroImage ? urlFor(heroImage)?.width(1800).height(1100).url() : null;
  const publishedDate = formatPublishedDate(post.date);
  const hasProducts = Boolean(post.recommendedProducts?.length);
  const hasMainBody = Boolean(post.intro) || Boolean(post.content?.length);

  return (
    <main className={`min-h-screen ${tokens.page}`}>
      <div className={tokens.shell}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-rose-600"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <article className="mt-6 space-y-8">
          {heroImageUrl ? (
            <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-black/5">
              <Image
                src={heroImageUrl}
                alt={post.title}
                width={1800}
                height={1100}
                priority
                className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[520px]"
              />
            </div>
          ) : null}

          <header className={tokens.headerCard}>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              {post.category ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 font-medium text-rose-700">
                  <Tag className="h-4 w-4" />
                  {post.category}
                </span>
              ) : null}
              {publishedDate ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {publishedDate}
                </span>
              ) : null}
              {post.postType ? (
                <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1.5 font-medium capitalize">
                  {post.postType === "default" ? "article" : post.postType}
                </span>
              ) : null}
            </div>

            <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {post.subHeadline ? (
              <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-600 sm:text-xl">
                {post.subHeadline}
              </p>
            ) : null}

            {post.excerpt ? (
              <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-500 sm:text-lg">
                {post.excerpt}
              </p>
            ) : null}
          </header>

          {hasMainBody ? (
            <div className={tokens.sectionCard}>
              <MarkdownBlock value={post.intro} />

              {Array.isArray(post.content) && post.content.length ? (
                <div className={`${post.intro ? "mt-8" : ""} ${tokens.prose}`}>
                  <RichText value={post.content} defaultImageAlt={post.title} />
                </div>
              ) : null}
            </div>
          ) : null}

          {post.contentSections?.length
            ? post.contentSections.map((section, index) => (
                <PostSection
                  key={`${section.heading || "section"}-${index}`}
                  section={section}
                  index={index}
                  sectionCardClass={tokens.sectionCard}
                />
              ))
            : null}

          {post.productHeader ? (
            <div className={tokens.sectionCard}>
              <MarkdownBlock value={post.productHeader} />
            </div>
          ) : null}

          {post.showAffiliateDisclosure && hasProducts ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50/90 px-5 py-4 text-sm leading-6 text-rose-900 shadow-sm">
              This post contains curated product links. If a reader buys through them, the site may
              earn a commission at no additional cost to the buyer.
            </div>
          ) : null}

          {hasProducts ? (
            <div className={tokens.sectionCard}>
              <RecommendedProducts recommendedProducts={post.recommendedProducts} />
            </div>
          ) : null}

          {post.outro ? (
            <div className={tokens.sectionCard}>
              <MarkdownBlock value={post.outro} />
            </div>
          ) : null}
        </article>
      </div>
    </main>
  );
}
