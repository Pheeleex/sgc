import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SanityLive } from "./blog/live";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
      <Navbar />
      {children}
      <SanityLive />
      <Footer />
   </div>
  );
}
