import { Audiowide } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export const metadata = {
  title: "SoundPlay",
  description: "Music site with more than a few thousand music variations",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={audiowide.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
