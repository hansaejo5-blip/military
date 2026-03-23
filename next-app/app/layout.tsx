import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: '군지원 플래너',
  description: '지원 가능한 분야, 필요한 준비, 자격증 마감 리스크를 빠르게 판단하는 비공식 군지원 도구',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] text-slate-500">UNOFFICIAL</p>
                <Link href="/" className="text-lg font-bold text-slate-900">
                  군지원 플래너
                </Link>
              </div>
              <nav className="hidden gap-3 text-sm font-medium text-slate-600 md:flex">
                <Link href="/">홈</Link>
                <Link href="/recommend">추천</Link>
                <Link href="/schedule">일정</Link>
                <Link href="/guide">군별 가이드</Link>
                <Link href="/my">마이페이지</Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
