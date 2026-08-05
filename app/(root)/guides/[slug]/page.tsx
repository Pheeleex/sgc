import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuideDetailRedirectPage(props: PageProps) {
  const params = await props.params;

  redirect(`/products/${params.slug}`);
}
