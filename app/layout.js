import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s — Pearla',
    default: 'Pearla — Authentic African Recipes',
  },
  description:
    'Authentic West African recipes — Jollof Rice, Egusi Soup, Suya, Pounded Yam and more. Step-by-step guides with full ingredients.',
  openGraph: {
    siteName: 'Pearla',
    type: 'website',
    title: 'Pearla — Authentic African Recipes',
    description:
      'Authentic West African recipes — Jollof Rice, Egusi Soup, Suya, Pounded Yam and more. Step-by-step guides with full ingredients.',
    images: [
      'https://images.unsplash.com/photo-1665332195309-9d75071138f0?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
