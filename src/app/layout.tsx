import { Inter } from 'next/font/google';
import { SiteLayout } from '@/components/layout/site-layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Real Estate Analyzer',
  description: 'Analyze real estate properties with advanced calculators and AI insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteLayout>
          {children}
        </SiteLayout>
      </body>
    </html>
  );
}
