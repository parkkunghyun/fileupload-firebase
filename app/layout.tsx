import type { Metadata } from "next";
import { Ovo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Dropbox with firebase and nextjs",
  description: "파일들을 저장하는 드롭박스 프로젝트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={ovo.className}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
