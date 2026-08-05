import Link from "next/link";

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
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-col gap-4 border-b border-[#eadde1] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9c6072]">
              Admin
            </p>
            <h1 className="mt-2 font-serif text-4xl text-[#35252d]">
              Product Files
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#725d66]">
              Create and edit product pages in Studio, then upload the private deliverable files here. The storefront attaches files automatically when the R2 folder matches the product document ID or file folder ID.
            </p>
          </div>
          <Link
            href="/admin/studio"
            className="inline-flex h-10 items-center justify-center rounded-md border border-[#d9c3cb] bg-white px-4 text-sm font-medium text-[#503540] shadow-xs transition hover:bg-[#fff7f4]"
          >
            Open Studio
          </Link>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-lg border border-[#eadde1] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Upload Files</h2>
            <p className="mt-1 text-sm text-[#725d66]">
              Select a product and upload one or more deliverables.
            </p>
            <div className="mt-6">
              {productsWithIds.length ? (
                <ProductUploadClient products={productsWithIds} />
              ) : (
                <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  No products with document IDs were found. Add products in Studio first.
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-lg border border-[#eadde1] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Current Products</h2>
            <div className="mt-4 space-y-3">
              {productsWithIds.map((product) => (
                <div
                  key={product.id}
                  className="rounded-md border border-[#f0e5e8] bg-[#fffaf8] p-3"
                >
                  <p className="text-sm font-medium text-[#35252d]">{product.title}</p>
                  <p className="mt-1 font-mono text-xs text-[#806873]">
                    {product.fileFolderId || product.id}
                  </p>
                  <p className="mt-2 text-xs text-[#806873]">
                    {product.files?.length ?? 0} file{product.files?.length === 1 ? "" : "s"} found
                  </p>
                </div>
              ))}
              {!productsWithIds.length ? (
                <p className="text-sm text-[#806873]">No product records found.</p>
              ) : null}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
