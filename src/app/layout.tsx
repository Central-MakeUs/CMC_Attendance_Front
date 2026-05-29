import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import SplashScreen from '@/components/SplashScreen';
import { CheckCircleIcon, AlertCircleIcon } from '@/components/icons';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CMC 출석',
  description: 'CMC 출석체크 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SplashScreen />
        {children}
        <Toaster
          position="bottom-center"
          offset={24}
          style={
            {
              '--width': 'min(calc(100vw - 32px), 358px)',
            } as React.CSSProperties
          }
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                'flex items-center gap-2 bg-[#454858] text-white text-sm font-medium leading-normal rounded-[100px] px-4 py-3 w-full',
            },
          }}
          icons={{
            success: <CheckCircleIcon />,
            warning: <AlertCircleIcon />,
          }}
        />
      </body>
      <GoogleAnalytics gaId="G-EV94GWLJM2" />
    </html>
  );
}
