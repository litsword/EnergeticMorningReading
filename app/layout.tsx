import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "能量晨读 - 图片生成器",
  description: "为你的每日晨读生成精美的分享图片",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
