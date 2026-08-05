import Link from "next/link";
import { ArrowRight, FileText, Mail, Sparkles } from "lucide-react";

import { getProducts } from "@/lib/data/products";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-neutral-50 py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">
              Products
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-neutral-900 sm:text-5xl">
              Practical resources for a softer, more intentional life
            </h1>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              Browse planners, checklists, videos, and digital support tools created to
              help you build routines that feel gentle, structured, and useful.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2">
                <Mail className="h-4 w-4 text-rose-500" />
                Delivered by email
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2">
                <Sparkles className="h-4 w-4 text-rose-500" />
                {products.length} products available
              </span>
            </div>
          </div>
        </section>

        <section className="mt-10">
          {products.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.slug}
                  className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="rounded-full bg-rose-100 px-3 py-1 text-rose-700 hover:bg-rose-100">
                      {product.category}
                    </Badge>
                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                      {product.accessType === "free" ? "Free" : "Product"}
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold text-neutral-900">
                    {product.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600 sm:text-base">
                    {product.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-500">
                    <span className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1.5">
                      <FileText className="h-4 w-4 text-rose-500" />
                      {(product.files?.length ?? 0) || 1} resource
                      {(product.files?.length ?? 0) === 1 ? "" : "s"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1.5">
                      <Mail className="h-4 w-4 text-rose-500" />
                      Inbox delivery
                    </span>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition hover:gap-3"
                  >
                    View product
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center text-neutral-600 shadow-sm">
              No products are published yet.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
