import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { islamicApps } from 'src/data/islamicAppsData';
import PageTransition from 'src/components/ui/PageTransition';
import AppDetails from 'src/components/software/AppDetails';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all 24 apps (plus backwards compatibility)
export async function generateStaticParams() {
  const params = islamicApps.map((app) => ({
    id: app.id,
  }));

  // Backwards compatibility for previous id if any
  if (!params.find((p) => p.id === 'quran-qiraat-app')) {
    params.push({ id: 'quran-qiraat-app' });
  }

  return params;
}

// Generate SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  let app = islamicApps.find((item) => item.id === id);

  // Fallback for legacy ID
  if (!app && id === 'quran-qiraat-app') {
    app = islamicApps.find((item) => item.id === 'al-mushaf-al-shareef');
  }

  if (!app) {
    return {
      title: 'التطبيق غير موجود | تِيجَان',
    };
  }

  const title = `تحميل تطبيق ${app.name} (${app.version}) مجاناً | منصة تِيجَان`;
  const description = app.fullDescription || app.description;

  return {
    title,
    description: description.substring(0, 160),
    openGraph: {
      title,
      description: description.substring(0, 160),
      type: 'article',
      url: `https://tijan-alislam.vercel.app/software/${app.id}`,
    },
    twitter: {
      card: 'summary',
      title,
      description: description.substring(0, 160),
    },
  };
}

export default async function SoftwareDetailPage({ params }: PageProps) {
  const { id } = await params;
  let app = islamicApps.find((item) => item.id === id);

  // Fallback for legacy ID
  if (!app && id === 'quran-qiraat-app') {
    app = islamicApps.find((item) => item.id === 'al-mushaf-al-shareef');
  }

  if (!app) {
    notFound();
  }

  // Schema.org SoftwareApplication structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    operatingSystem: 'Android, iOS, HarmonyOS',
    applicationCategory: 'EducationalApplication',
    softwareVersion: app.version,
    fileSize: app.size,
    description: app.fullDescription || app.description,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: app.rating.toString(),
      ratingCount: app.reviewsCount ? app.reviewsCount.replace(/[^0-9]/g, '') : '2340',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-24 pt-8" dir="rtl">
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Ambient background glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-1/4 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppDetails app={app} />
        </div>
      </main>
    </PageTransition>
  );
}