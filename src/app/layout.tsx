import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Cairo, Amiri, Tajawal } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'src/context/ThemeProvider';
import Header from 'src/components/layout/Header';
import Footer from 'src/components/layout/Footer';

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const amiri = Amiri({
  subsets: ['arabic'],
  variable: '--font-amiri',
  weight: ['400', '700'],
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['300', '400', '500', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tijan-alislam.vercel.app'),
  title: 'منصة تِيجَان الإسلام | العلوم الشرعية وتطبيقات تيسير العلم لطلبة العلم',
  description:
    'منصة إسلامية تأصيلية متكاملة تهدف لتيسير العلوم الشرعية لطلبة العلم، وتجمع بين ركن المتون العلمية والسلاسل التعليمية، ومكتبة التطبيقات المساندة لخدمة القرآن الكريم والقراءات العشر.',
  keywords: [
    'طلب العلم الشرعي',
    'متون علمية',
    'سلاسل تعليمية',
    'تيسير العلوم الشرعية',
    'منصة تيجان العلمية',
    'منصة تيجان الإسلام',
    'العلوم الشرعية لطلبة العلم',
    'تطبيقات تسهيل العلم',
    'مصحف القراءات العشر',
    'التجويد والقراءات',
    'تطبيقات إسلامية مساندة',
    'تعليم القراءات العشر',
    'متن الشاطبية والدرة',
    'tijan',
    'tijan alislam',
    'islamic sciences',
    'sharia studies',
    'qiraat apps',
  ],
  openGraph: {
    title: 'منصة تِيجَان الإسلام | العلوم الشرعية وتطبيقات تيسير العلم لطلبة العلم',
    description:
      'بوابتك التأصيلية لتعلم القراءات العشر والعلوم الشرعية واللغوية عبر تطبيقات تفاعلية، متون علمية، وسلاسل تعليمية ومنظومات رصينة.',
    url: 'https://tijan-alislam.vercel.app',
    siteName: 'تِيجَان الإسلام',
    locale: 'ar_EG',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // كود البيانات المنظمة لإجبار جوجل على قراءة اسم الموقع
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "تِيجَان الإسلام",
    "alternateName": ["منصة تيجان الإسلام", "Tijan Alislam"],
    "url": "https://tijan-alislam.vercel.app"
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${amiri.variable} ${tajawal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <meta
          name="google-site-verification"
          content="6m4cvKjfzOIaoX_uomrPRcUBviSVY6ueK9IIz_hxQ6Y"
        />
        {/* إضافة الـ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col theme-transition bg-background text-foreground">
        <ClerkProvider>
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
        </ClerkProvider>
      </body>
    </html>
  );
}