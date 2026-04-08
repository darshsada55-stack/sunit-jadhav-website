import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sunit Jadhav | IFBB Pro Bodybuilder | Mr. Asia 2018',
  description:
    'Official website of Sunit Jadhav — IFBB Pro bodybuilder from Mumbai. Mr. Asia 2018 Overall Champion, Mr. India 2016 & 2017 Overall Champion. Online coaching and sponsorship inquiries.',
  keywords: [
    'Sunit Jadhav',
    'IFBB Pro',
    'bodybuilder',
    'Mr Asia 2018',
    'Mr India',
    'Mumbai',
    'bodybuilding coach',
    'One Science Nutrition',
  ],
  authors: [{ name: 'Sunit Jadhav' }],
  openGraph: {
    title: 'Sunit Jadhav | IFBB Pro Bodybuilder',
    description: 'Mr. Asia 2018 Overall Champion | IFBB Pro | Online Coaching',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunit Jadhav | IFBB Pro Bodybuilder',
    description: 'Mr. Asia 2018 Overall Champion | IFBB Pro | Online Coaching',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
