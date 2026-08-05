import Link from "next/link";
import { Instagram, Mail, MessageCircleHeart } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-50 py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">
              Contact
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-neutral-900 sm:text-5xl">
              Reach out to Soft Girl Circle
            </h1>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              If you have a question, collaboration idea, or support request,
              this is the right place to start.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <Mail className="h-8 w-8 text-rose-500" />
            <h2 className="mt-4 text-2xl font-semibold text-neutral-900">
              Email
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Questions about products, resources, or partnerships can go straight
              to our inbox.
            </p>
            <a
              href="mailto:hello@softgirlcircle.com"
              className="mt-5 inline-flex text-sm font-semibold text-rose-600"
            >
              hello@softgirlcircle.com
            </a>
          </article>

          <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <Instagram className="h-8 w-8 text-rose-500" />
            <h2 className="mt-4 text-2xl font-semibold text-neutral-900">
              Social
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Follow the brand for visual inspiration, updates, and soft living
              moments between posts.
            </p>
            <a
              href="https://pin.it/2MpnYXYET"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-rose-600"
            >
              Visit our Pinterest
            </a>
          </article>

          <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <MessageCircleHeart className="h-8 w-8 text-rose-500" />
            <h2 className="mt-4 text-2xl font-semibold text-neutral-900">
              Next Step
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Want the quickest way into the brand? Start with a product or browse
              the latest blog posts.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm font-semibold text-rose-600">
              <Link href="/products">Browse products</Link>
              <Link href="/blog">Read the blog</Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
