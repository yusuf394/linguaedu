import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorker from "@/components/ServiceWorker";

export const metadata: Metadata = {
  title: "Lingua Edu — Belajar Bahasa, Membangun Makna",
  description: "Platform belajar Bahasa Indonesia melalui podcast, video, dan flashcards.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Lingua Edu" },
};
export const viewport: Viewport = {
  themeColor: "#2457D6",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><ServiceWorker />{children}</body></html>;
}
