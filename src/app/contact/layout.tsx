import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'اتصل بنا وتواصل مع فريق التطوير | منصة البرمجيات القرآنية',
  description: 'تواصل مع فريق تطوير منصة البرمجيات القرآنية لاقتراح تطبيقات قرآنية جديدة، التبليغ عن أخطاء صوتية في التلاوات، أو أي استفسار تقني وتعاون برمجي.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
