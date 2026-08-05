import { notFound } from "next/navigation";

import PaywallClient from "@/components/PaywallClient";
import { getProductBySlug } from "@/lib/data/products";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage(props: PageProps) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full">
      <PaywallClient guide={product} />
    </div>
  );
}
