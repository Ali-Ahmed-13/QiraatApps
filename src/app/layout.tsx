import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "src/context/ThemeProvider";
import Header from "src/components/layout/Header";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "دليل تطبيقات علوم القرآن والقراءات | منصة البرمجيات القرآنية المتكاملة",
  description: "منصة برمجية متكاملة توفر لك وصولاً مباشراً وموثوقاً لأحدث التطبيقات والأدوات الرقمية المتخصصة في علوم المصحف الشريف والقراءات العشر المطورة بلغة فلاتر.",
  keywords: ["تطبيقات القرآن", "علوم القرآن", "القراءات العشر", "المصحف الشريف", "تطبيقات فلاتر"],
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
      <body className="min-h-full flex flex-col theme-transition">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            <div className="container mx-auto px-4">
              <p>جميع الحقوق محفوظة © {new Date().getFullYear()} دليل تطبيقات علوم القرآن والقراءات</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
