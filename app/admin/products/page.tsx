import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { getProducts } from "@/lib/data/products";
import ProductUploadClient, { type AdminProductOption } from "./ProductUploadClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getProducts();
  const productsWithIds: AdminProductOption[] = products
    .filter((product) => Boolean(product.id))
    .map((product) => ({
      fileFolderId: product.fileFolderId,
      files: product.files ?? [],
      id: product.id ?? "",
      slug: product.slug,
      title: product.title,
    }));

  return (
    <main className="min-h-screen bg-[#fbf7f5] px-4 py-10 text-[#35252d] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-5 border-b border-[#eadde1] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9c6072]">
              Admin
            </p>
            <h1 className="mt-2 font-serif text-4xl text-[#35252d] sm:text-5xl">
              Product Files
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#725d66]">
              Manage private deliverables for each Sanity product. Upload files into the matching R2 folder, review what is attached, and remove mistakes before customers see them.
            </p>
          </div>
          <Link
            href="/admin/studio"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#d9c3cb] bg-white px-4 text-sm font-medium text-[#503540] shadow-xs transition hover:bg-[#fff7f4]"
          >
            <ExternalLink className="h-4 w-4" />
            Open Studio
          </Link>
        </header>

        {productsWithIds.length ? (
          <ProductUploadClient products={productsWithIds} />
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            No products with document IDs were found. Add products in Studio first.
          </div>
        )}
      </div>
    </main>
  );
}
