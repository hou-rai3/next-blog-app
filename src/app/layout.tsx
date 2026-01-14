import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RobotBuddy from "./components/RobotBuddy";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marbling Dev Log",
  description: "ロボコンmarbling開発記録 - 技術検証、参考事例、実装ログを書き残すブログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="app-shell">
          <header className="top-nav">
            <div className="brand">
              <span className="brand-dot" aria-hidden />
              <span>Marbling Dev Log</span>
            </div>
            <nav className="nav-links">
              <Link className="nav-link" href="/">
                投稿一覧
              </Link>
              <Link className="nav-link" href="/about">
                About
              </Link>
              <Link className="nav-link" href="/admin/posts">
                Admin Posts
              </Link>
              <Link className="nav-link" href="/admin/categories">
                Admin Categories
              </Link>
            </nav>
          </header>
          <main className="page-body">{children}</main>
          <footer className="footer">
            <span>Built with Next.js 15 + Route Handlers</span>
          </footer>

          <RobotBuddy />
        </div>
      </body>
    </html>
  );
}
