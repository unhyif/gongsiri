import '@styles/globals.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { themeClass } from '@styles/theme.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gongsiri',
  description: 'SH 청년안심주택 공실 안내 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} ${themeClass}`}>{children}</body>
    </html>
  );
}
