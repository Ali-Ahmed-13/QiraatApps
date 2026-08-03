import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'اتصل بنا وتواصل مع فريق التطوير | منصة تِيجَان',
  description: 'تواصل مع فريق تطوير منصة تِيجَان لاقتراح تطبيقات قرآنية جديدة، التبليغ عن أخطاء صوتية في التلاوات، أو أي استفسار تقني وتعاون برمجي.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
