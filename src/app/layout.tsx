import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'TravelBharat - Incredible India',
  description: 'Explore the rich tapestry of Indian heritage, nature, and adventure. Your comprehensive digital guide to Incredible India.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Fonts - Playfair Display (Headings) + PT Sans (Body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className="font-body antialiased bg-background text-foreground min-h-screen"
        suppressHydrationWarning
      >
        {/* Main content wrapper - NO px-4 here to allow full-width sections */}
        <div className="flex flex-col min-h-screen">
          {children}
        </div>

        {/* Toast notifications */}
        <Toaster />
      </body>
    </html>
  );
}