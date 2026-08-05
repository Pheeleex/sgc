import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const page = async (props: PageProps) => {
  const params = await props.params;
  redirect(`/products/${params.name}`);
};
export default page;
