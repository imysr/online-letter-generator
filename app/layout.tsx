import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Just for You | Online Letter Studio",
  description: "Create an interactive letter filled with memories, flowers and words worth keeping.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
