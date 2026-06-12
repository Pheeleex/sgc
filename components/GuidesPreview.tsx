import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";

import type { Documents } from "@/lib/firebase/getProducts";
import { Badge } from "./ui/badge";

type GuidesPreviewProps = {
  guides: Documents[];
};

export default function GuidesPreview({ guides }: GuidesPreviewProps) {
  if (!guides.length) {
    return null;
  }

  const featuredGuides = guides.slice(0, 3);

  return (
    <section className="bg-rose-50/70 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">
              Guides
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-neutral-900 sm:text-4xl">
              Start with a guide you can actually use
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              These downloads are the practical side of the brand: soft systems,
              routines, and digital resources delivered straight to your inbox.
            </p>
          </div>

          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition hover:gap-3"
          >
            View all guides
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredGuides.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-rose-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <Badge className="rounded-full bg-rose-100 px-3 py-1 text-rose-700 hover:bg-rose-100">
                  {guide.category}
                </Badge>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                  Guide 0{index + 1}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-neutral-900">
                {guide.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600 sm:text-base">
                {guide.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1.5">
                  <Mail className="h-4 w-4 text-rose-500" />
                  Email delivery
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1.5">
                  <FileText className="h-4 w-4 text-rose-500" />
                  {(guide.files?.length ?? 0) || 1} resource
                  {(guide.files?.length ?? 0) === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition group-hover:gap-3">
                View guide
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
