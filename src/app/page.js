import CardLanding from "@/components/template/landing/CardLanding";
import PosterLandgin from "@/components/template/landing/Poster.landgin";
import DarkModeSwitch from "@/components/ui/DarkModeSwitch";

export default function Home() {
  return (
    <main className=" dark:bg-black text-black dark:text-white">
      {/* دکمه دارک مود */}
      <div className="absolute top-4 right-4 z-20"></div>

      <PosterLandgin />
      <CardLanding />
    </main>
  );
}
