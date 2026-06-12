import Link from "next/link";
import { ArrowRight, FileText, Mail, Sparkles } from "lucide-react";

import { getDocuments } from "@/lib/firebase/getProducts";
import { Badge } from "@/components/ui/badge";

export default async function GuidesPage() {
  const guides = await getDocuments();

  return (
    <main className="min-h-screen bg-neutral-50 py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">
              Guides
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-neutral-900 sm:text-5xl">
              Practical resources for a softer, more intentional life
            </h1>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              Browse planners, checklists, and digital support tools created to
              help you build routines that feel gentle, structured, and useful.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2">
                <Mail className="h-4 w-4 text-rose-500" />
                Delivered by email
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2">
                <Sparkles className="h-4 w-4 text-rose-500" />
                {guides.length} guides available
              </span>
            </div>
          </div>
        </section>

        <section className="mt-10">
          {guides.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {guides.map((guide) => (
                <article
                  key={guide.slug}
                  className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="rounded-full bg-rose-100 px-3 py-1 text-rose-700 hover:bg-rose-100">
                      {guide.category}
                    </Badge>
                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                      Guide
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold text-neutral-900">
                    {guide.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600 sm:text-base">
                    {guide.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-500">
                    <span className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1.5">
                      <FileText className="h-4 w-4 text-rose-500" />
                      {(guide.files?.length ?? 0) || 1} resource
                      {(guide.files?.length ?? 0) === 1 ? "" : "s"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1.5">
                      <Mail className="h-4 w-4 text-rose-500" />
                      Inbox delivery
                    </span>
                  </div>

                  <Link
                    href={`/guides/${guide.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition hover:gap-3"
                  >
                    View guide
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center text-neutral-600 shadow-sm">
              No guides are published yet.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
