'use client';

import { use, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { sciencesData, aliasMap } from '@/data/sciencesData';

export default function DynamicSciencePage({ params }: { params: Promise<{ scienceId: string }> }) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.scienceId;
  const targetKey = aliasMap[rawId] || rawId;
  const science = sciencesData[targetKey];
  const router = useRouter();

  useEffect(() => {
    if (science) {
      router.replace(`/sciences/${rawId}/level-1`);
    }
  }, [science, rawId, router]);

  if (!science) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center font-tajawal text-muted">
      جاري التوجيه إلى المستوى الأول...
    </div>
  );
}
