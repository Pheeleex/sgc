import PaywallClient from "@/components/PaywallClient";
import { getDocumentBySlug } from "@/lib/firebase/getProducts";

interface PageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const page = async (props: PageProps) => {
  const params = await props.params;

  const guide = await getDocumentBySlug(params.name);

  console.log( "new guide=>",JSON.stringify(guide));
  console.log("Guide:", guide);
  return (
    <div className="mt-20 w-full">
      <PaywallClient guide={guide} />
    </div>
  );
};
export default page;
