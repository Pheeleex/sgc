import Banner from "@/components/Banner";
import FeaturedCategories from "@/components/FeaturedCategories";
import GuidesPreview from "@/components/GuidesPreview";
import Hero from "@/components/Hero";
import Posts from "@/components/Posts";
import RecommendedProducts from "@/components/Products";
import SocialMedia from "@/components/SocialMedia";
import StartHere from "@/components/StartHere";
import { getDocuments } from "@/lib/firebase/getProducts";
import React from "react";
import { BLOG_LIST_QUERY } from "@/lib/utils";
import { sanityFetch } from "./blog/live";

type BlogListItem = {
  _id: string;
  category?: string;
  date?: string;
  excerpt?: string;
  mainImage?: unknown;
  slug: { current: string };
  title: string;
};

const page = async () => {
  const [{ data: posts = [] }, guides] = await Promise.all([
    sanityFetch<BlogListItem[]>({
      query: BLOG_LIST_QUERY,
    }),
    getDocuments(),
  ]);
  const homepagePosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Hero />
      <StartHere />
      <GuidesPreview guides={guides} />
      <Posts posts={homepagePosts} />
      <FeaturedCategories />
      <Banner />
      <RecommendedProducts />
      <SocialMedia />
    </div>
  );
};

export default page;
