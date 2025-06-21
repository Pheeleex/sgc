import { sanityFetch } from "./live";
import { BLOG_LIST_QUERY } from "@/lib/utils";
import Posts from "@/components/Posts";

;

export default async function BlogListPage() {
  const { data: posts } = await sanityFetch({ query: BLOG_LIST_QUERY });
  console.log(posts, 'posts');
  if (!posts) {
    return <div className="container mx-auto px-4 py-12">No posts found.</div>;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <Posts posts={posts} />
    </main>
  );
}
