import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 🔒 المسارات المحمية فقط (مثل بوابة الطالب)
const isProtectedRoute = createRouteMatcher(['/student-hub(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // تخطي المكونات الداخلية لـ Next.js والملفات الاستاتيكية
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // تشغيل دائم لمسارات API
    '/(api|trpc)(.*)',
    // مسار التوجيه التلقائي لـ Clerk
    '/__clerk/:path*',
  ],
};
