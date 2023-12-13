import Gallery from "@/components/Gallery";
import { Head } from "@/components/Head";

export default function Home() {
  return (
    <main className="flex min-h-screen  mx-auto flex-col  items-center">
      <Head />
      <Gallery />
    </main>
  );
}
