import Link from "next/link";
import { ArrowRight, BookOpenText, HeartHandshake, ShoppingBag } from "lucide-react";

const paths = [
  {
    href: "/blog",
    label: "Read the Blog",
    title: "Articles for your soft living journey",
    description:
      "Explore beauty, wellness, fashion, and faith-led lifestyle stories that help you move with more intention.",
    icon: BookOpenText,
    accent: "from-rose-100 via-white to-pink-50",
  },
  {
    href: "/products",
    label: "Get a Product",
    title: "Download gentle systems and resources",
    description:
      "Find planners, checklists, and digital tools designed to help you build structure without losing softness.",
    icon: HeartHandshake,
    accent: "from-amber-50 via-white to-rose-50",
  },
  {
    href: "/shop",
    label: "Browse the Shop",
    title: "Discover curated products and essentials",
    description:
      "Browse the handpicked beauty and wellness picks that support your routines, rituals, and glow-up habits.",
    icon: ShoppingBag,
    accent: "from-violet-50 via-white to-rose-50",
  },
] as const;

export default function StartHere() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">
            Start Here
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Choose the path that fits what you need today
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-600 sm:text-lg">
            Soft Girl Circle works best when it feels simple: read, download,
            or browse. Pick your next step and we will take you there.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {paths.map((path) => {
            const Icon = path.icon;

            return (
              <Link
                key={path.href}
                href={path.href}
                className={`group rounded-3xl border border-neutral-200 bg-gradient-to-br ${path.accent} p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-rose-500 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>

                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {path.label}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-neutral-900">
                  {path.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600 sm:text-base">
                  {path.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition group-hover:gap-3">
                  Explore now
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
