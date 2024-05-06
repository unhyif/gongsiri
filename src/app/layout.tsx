import '@styles/globals.css';

import GTMProvider from '@components/layout/GTMProvider';
import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import { themeClass } from '@styles/theme.css';

const pretendard = localFont({
  src: '../styles/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gongsiri.vercel.app/'),
  title: 'Gongsiri',
  description: 'SH 청년안심주택 공실 안내 서비스',
  openGraph: {
    title: 'Gongsiri',
    description: 'SH 청년안심주택 최신 공실 확인하기',
    url: 'https://gongsiri.vercel.app/',
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
        <GTMProvider>
          {children}
          <Script
            async
            type="text/javascript"
            src="https://t1.daumcdn.net/kas/static/ba.min.js"
          />
        </GTMProvider>
      </body>
    </html>
  );
}
