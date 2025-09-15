import DarkModeSwitch from "@/components/ui/DarkModeSwitch";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-3xl mb-4">Dark Mode Example</h1>
      <DarkModeSwitch />
    </main>
  );
}
