import Footer from "@/components/template/Footer/Footer";
import Albums from "@/components/template/landing/Album";
import CardLanding from "@/components/template/landing/CardLanding";
import MusicVideo from "@/components/template/landing/MusicVideo";
import PosterLanding from "@/components/template/landing/Poster.landgin";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col gap-6 px-2 sm:px-4 md:px-8 lg:px-12 py-4 overflow-y-auto scroll-auto md:scroll-smooth">
      <PosterLanding />
      <CardLanding />
      <Albums />
      <MusicVideo />
      <Footer />
    </main>
  );
}
