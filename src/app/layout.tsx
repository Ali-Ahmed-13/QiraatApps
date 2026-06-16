import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'src/context/ThemeProvider';
import Header from 'src/components/layout/Header';
import Footer from 'src/components/layout/Footer';
import Script from 'next/script'; // مستورد بشكل صحيح هنا

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'تطبيقات القرآن والقراءات',
  description:
    'منصة برمجية متكاملة توفر لك وصولاً مباشراً وموثوقاً لأحدث التطبيقات والأدوات الرقمية المتخصصة في علوم المصحف الشريف والقراءات العشر.',
  keywords: [
    'القرآن الكريم',
    'القراءات العشر',
    'علم القراءات',
    'متن الشاطبية',
    'الدرة المضية',
    'طيبة النشر',
    'الجزرية',
    'ورش عن نافع',
    'حفص عن عاصم',
    'قالون عن نافع',
    'مصحف القراءات',
    'تعليم القراءات',
    'متون القراءات',
    'علوم القرآن',
    'التجويد',
    'quran qiraat',
    'qiraat app',
    'quran app',
    'shatibiyyah',
    'jazariyyah',
  ],
  openGraph: {
    title: 'تطبيقات القرآن والقراءات',
    description:
      'منصة متخصصة في تطبيقات القرآن الكريم والقراءات العشر ومتون القراءات.',
    url: 'https://qiraat-apps.vercel.app',
    siteName: 'تطبيقات القرآن والقراءات',
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3451960734289975"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <meta
          name="google-site-verification"
          content="6m4cvKjfzOIaoX_uomrPRcUBviSVY6ueK9IIz_hxQ6Y"
        />
      </head>
      <body className="min-h-full flex flex-col theme-transition">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
