import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components";
import { auth } from "@/auth.config";

const font = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Tesla Threads",
    default: "Home | Tesla Threads",
  },
  description:
    "Tesla Threads is a an e-commerce store that offers a wide range of products, including clothing, accessories, and home decor. Our mission is to provide high-quality products that are inspired by the innovative spirit of Tesla.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
