import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '군지원 플래너',
  description: '지원 가능한 분야, 필요한 준비, 자격증 마감 리스크를 빠르게 판단하는 비공식 군지원 도구',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
