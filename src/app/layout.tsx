import '@styles/globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { themeClass } from '@styles/theme.css';

const pretendard = localFont({
  src: '../styles/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'Gongsiri',
  description: 'SH 청년안심주택 공실 안내 서비스',
  openGraph: {
    title: 'Gongsiri',
    description: 'SH 청년안심주택 최신 공실 확인하기 ✨',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} ${themeClass}`}>
        {children}
      </body>
    </html>
  );
}
