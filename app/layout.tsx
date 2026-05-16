import type { Metadata } from 'next';
import './globals.css';
import { DashboardProvider } from '@/context/DashboardContext';
import ConditionalNavbar from '@/components/layout/ConditionalNavbar';

export const metadata: Metadata = {
  title: 'CrossThink — Where Ideas Meet Talent',
  description: 'CrossThink connects students, faculty, and innovators into one collaborative ecosystem. Build multidisciplinary projects that change the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#050505]">
        <DashboardProvider>
          <ConditionalNavbar />
          {children}
        </DashboardProvider>
      </body>
    </html>
  );
}
