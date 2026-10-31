import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ledger",
  description: "A habit tracker built on the Four Laws of Behavior Change",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
