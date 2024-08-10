import '@styles/globals.css';

import DeviceProvider from '@components/layout/DeviceProvider';
import GoogleTagManager from '@components/layout/GoogleTagManager';
import type { Metadata } from 'next';
import Script from 'next/script';
import { checkMobile } from '@utils/userAgent';
import localFont from 'next/font/local';
import { themeClass } from '@styles/theme.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://gongsiri.site/'),
  title: '공실이 | Gongsiri',
  description: 'SH 청년안심주택 공실 안내 서비스',
  openGraph: {
    title: '공실이 | Gongsiri',
    description: 'SH 청년안심주택 최신 공실 확인하기',
    url: 'https://gongsiri.site/',
  },
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_ID,
    other: {
      'naver-site-verification': process.env.NAVER_SEARCH_ADVISOR_ID ?? '',
      'google-adsense-account': process.env.GOOGLE_ADSENSE_ACCOUNT ?? '',
    },
  },
  alternates: {
    canonical: 'https://gongsiri.site/',
  },
};

const pretendard = localFont({
  src: '../styles/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} ${themeClass}`}>
        <GoogleTagManager>
          <DeviceProvider isMobile={checkMobile()}>{children}</DeviceProvider>
        </GoogleTagManager>
        <Script
          async
          type="text/javascript"
          src="https://t1.daumcdn.net/kas/static/ba.min.js"
        />
      </body>
    </html>
  );
}
