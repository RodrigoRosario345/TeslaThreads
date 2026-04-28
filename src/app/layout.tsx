import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Tesla Threads",
    default: "Home | Tesla Threads",
  },
  description:
    "Tesla Threads is a an e-commerce store that offers a wide range of products, including clothing, accessories, and home decor. Our mission is to provide high-quality products that are inspired by the innovative spirit of Tesla.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
