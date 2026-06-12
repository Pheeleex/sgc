import { notFound } from "next/navigation";

import PaywallClient from "@/components/PaywallClient";
import { getDocumentBySlug } from "@/lib/firebase/getProducts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuideDetailPage(props: PageProps) {
  const params = await props.params;
  const guide = await getDocumentBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="w-full">
      <PaywallClient guide={guide} />
    </div>
  );
}
