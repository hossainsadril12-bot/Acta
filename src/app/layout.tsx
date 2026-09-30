import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { site } from "@/content";
import { DevToolbar } from "@/components/dev/DevToolbar";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono", display: "swap" });

// Runs before first paint: arms the scroll reveals (so revealed content never flashes), and
// disarms them if the observer has not started within 3s, so content can never stay hidden.
const REVEAL_BOOT = `document.documentElement.classList.add("reveal");setTimeout(function(){var d=document.documentElement;if(!d.classList.contains("reveal-ready"))d.classList.remove("reveal")},3000);`;

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.meta.lang} className={`${inter.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT }} />
      </head>
      <body>
        {children}
        <RevealObserver />
        <SmoothScroll />
        {process.env.NODE_ENV === "development" && <DevToolbar appName={site.brand.name} />}
      </body>
    </html>
  );
}
