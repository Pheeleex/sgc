import RecommendedProducts from "@/components/Products";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-neutral-50 py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">
              Shop
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-neutral-900 sm:text-5xl">
              Curated essentials for your routines and rituals
            </h1>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              Browse our current selection of beauty and wellness picks. This
              section is designed like a curated shelf: thoughtful, personal,
              and easy to explore.
            </p>
          </div>
        </section>

        <div className="mt-10">
          <RecommendedProducts />
        </div>
      </div>
    </main>
  );
}
