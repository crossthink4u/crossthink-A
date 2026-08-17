import type { Metadata, Viewport } from 'next';
import { Funnel_Display } from 'next/font/google';
import './globals.css';
import { DashboardProvider } from '@/context/DashboardContext';
import ConditionalNavbar from '@/components/layout/ConditionalNavbar';
import { siteUrl } from '@/lib/site';

const funnel = Funnel_Display({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-funnel',
});

const description =
  'CrossThink connects students, faculty, and innovators into one collaborative ecosystem. Browse open student projects, find your team, and apply in two minutes — no account required to look.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CrossThink: by Iris — Where Ideas Meet Talent',
    template: '%s · CrossThink: by Iris',
  },
  description,
  applicationName: 'CrossThink',
  keywords: [
    'student projects', 'college collaboration', 'find a team',
    'research projects', 'campus innovation', 'CrossThink', 'Iris',
  ],
  authors: [{ name: 'Iris' }],
  openGraph: {
    type: 'website',
    siteName: 'CrossThink: by Iris',
    title: 'CrossThink: by Iris — Where Ideas Meet Talent',
    description,
    url: siteUrl,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrossThink: by Iris — Where Ideas Meet Talent',
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${funnel.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-[#050505]">
        <DashboardProvider>
          <ConditionalNavbar />
          {children}
        </DashboardProvider>
      </body>
    </html>
  );
}
