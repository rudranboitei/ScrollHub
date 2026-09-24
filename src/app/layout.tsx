import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AhoyIndex • The Seven Seas Streaming & Media Directory",
  description:
    "Curated index of 164+ hand-tested streaming portals, movies, anime, live sports, TV, manga, torrents, and privacy tools.",
  icons: {
    icon: "https://ahoylist.net/pirate.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("dark h-full antialiased", inter.variable, mono.variable)}
    >
      <body className="min-h-full flex flex-col bg-[#08090d] text-zinc-100 font-sans selection:bg-rose-500/30 selection:text-rose-200">
        {children}
      </body>
    </html>
  );
}
