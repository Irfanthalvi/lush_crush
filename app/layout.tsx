import type { Metadata } from "next";
import "../src/index.css";

export const metadata: Metadata = {
  title: "School System",
  description: "School System dashboard and learning platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
