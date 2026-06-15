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
  title:
    'دليل تطبيقات علوم القرآن والقراءات | منصة البرمجيات القرآنية المتكاملة',
  description:
    'منصة برمجية متكاملة توفر لك وصولاً مباشراً وموثوقاً لأحدث التطبيقات والأدوات الرقمية المتخصصة في علوم المصحف الشريف والقراءات العشر المطورة بلغة فلاتر.',
  keywords: [
    'تطبيقات القرآن',
    'علوم القرآن',
    'القراءات العشر',
    'المصحف الشريف',
    'تطبيقات فلاتر',
  ],
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
        {/* تعديل كود جوجل أدسنس باستخدام مكون Script التابع لـ Next.js */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3451960734289975"
          crossOrigin="anonymous"
          strategy="afterInteractive"
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
