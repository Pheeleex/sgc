import { sanityFetch } from "./live";
import { BLOG_LIST_QUERY } from "@/lib/utils";
import Posts from "@/components/Posts";

type BlogListItem = {
  _id: string;
  category?: string;
  date?: string;
  excerpt?: string;
  mainImage?: unknown;
  slug: { current: string };
  title: string;
};

export default async function BlogListPage() {
  const { data: posts = [] } = await sanityFetch<BlogListItem[]>({
    query: BLOG_LIST_QUERY,
  });
  if (!posts) {
    return <div className="container mx-auto px-4 py-12">No posts found.</div>;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <Posts posts={posts} showViewAllArticlesButton={false} />
    </main>
  );
}
