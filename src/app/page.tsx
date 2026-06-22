import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Download,
  GraduationCap,
  Layers,
  Sparkles,
} from 'lucide-react';
import homeData from '@/data/homeData.json';

type HomeStat = {
  value: string;
  label: string;
  description: string;
};

type HomeGateway = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  cta: string;
  highlights: string[];
};

type HomeFeature = {
  title: string;
  description: string;
};

type HomeData = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
  };
  stats: HomeStat[];
  gateways: HomeGateway[];
  features: HomeFeature[];
};

const data = homeData as HomeData;

const gatewayIcons = {
  software: Download,
  'student-corner': GraduationCap,
};

export default function Home() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#FAF7F2] text-slate-950 transition-colors duration-500 dark:bg-[#0b0f19] dark:text-slate-100"
    >
      <section className="relative border-b border-amber-900/10 dark:border-amber-400/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(217,119,6,0.16),transparent_30%),radial-gradient(circle_at_84%_14%,rgba(15,23,42,0.10),transparent_30%),linear-gradient(135deg,rgba(245,158,11,0.10),transparent_46%)] dark:bg-[radial-gradient(circle_at_16%_8%,rgba(245,158,11,0.18),transparent_30%),radial-gradient(circle_at_84%_10%,rgba(148,163,184,0.10),transparent_32%),linear-gradient(135deg,rgba(251,191,36,0.07),transparent_46%)]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-amber-100/80 px-4 py-2 text-xs font-extrabold text-amber-800 shadow-sm dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-400">
              <Sparkles className="h-4 w-4" />
              <span>{data.hero.eyebrow}</span>
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-[#f8f4ea] sm:text-5xl lg:text-7xl">
              {data.hero.title}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-sm font-semibold leading-8 text-slate-600 dark:text-slate-300 sm:text-base lg:text-lg">
              {data.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={data.hero.primaryCta.href}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-xl shadow-amber-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-2xl dark:bg-amber-500 dark:text-slate-950 dark:shadow-amber-500/20 dark:hover:bg-amber-400 sm:w-auto"
              >
                <Download className="h-4 w-4" />
                <span>{data.hero.primaryCta.label}</span>
              </Link>
              <Link
                href={data.hero.secondaryCta.href}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-amber-700/25 bg-white/75 px-6 py-3 text-sm font-black text-amber-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-700/45 hover:bg-amber-100/70 dark:border-amber-500/25 dark:bg-[#0c111d]/80 dark:text-amber-300 dark:hover:bg-amber-500/10 sm:w-auto"
              >
                <BookOpen className="h-4 w-4" />
                <span>{data.hero.secondaryCta.label}</span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto mt-12 grid w-full max-w-5xl gap-3 md:grid-cols-3">
            {data.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group rounded-[1.5rem] border border-amber-900/10 bg-card/85 p-5 text-right shadow-xl shadow-amber-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-amber-700/25 hover:shadow-2xl dark:border-amber-400/10 dark:bg-[#0c111d]/88 dark:shadow-black/25 dark:hover:border-amber-500/35"
                style={{ transitionDelay: `${index * 45}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-3xl font-black text-amber-700 dark:text-amber-500">
                    {stat.value}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-700/20 bg-amber-100 text-amber-800 transition-transform duration-300 group-hover:scale-110 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                    <Layers className="h-5 w-5" />
                  </span>
                </div>
                <h2 className="mt-4 text-base font-black text-slate-950 dark:text-[#f8f4ea]">
                  {stat.label}
                </h2>
                <p className="mt-2 text-xs font-semibold leading-6 text-slate-500 dark:text-slate-400">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700 dark:text-amber-500">
            بوابات تيجان
          </p>
          <h2 className="text-2xl font-black text-slate-950 dark:text-[#f8f4ea] sm:text-3xl">
            اختر طريقك بين التطبيق والمنهج
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {data.gateways.map((gateway, index) => {
            const Icon =
              gatewayIcons[gateway.id as keyof typeof gatewayIcons] ?? Compass;

            return (
              <Link
                key={gateway.id}
                href={gateway.href}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-card p-6 shadow-xl shadow-amber-900/5 transition-all duration-500 hover:-translate-y-1 hover:border-amber-700/30 hover:shadow-2xl hover:shadow-amber-900/10 dark:border-slate-800 dark:bg-[#0c111d] dark:shadow-black/25 dark:hover:border-amber-500/35 dark:hover:shadow-amber-500/10 sm:p-8"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-8 flex items-start justify-between gap-5">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-700/20 bg-amber-100 text-amber-800 shadow-sm transition-transform duration-300 group-hover:scale-110 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-3 py-1.5 text-[11px] font-black text-slate-500 dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-400">
                      <Compass className="h-3.5 w-3.5 text-amber-700 dark:text-amber-500" />
                      {gateway.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black leading-snug text-slate-950 transition-colors duration-300 group-hover:text-amber-800 dark:text-[#f8f4ea] dark:group-hover:text-amber-400">
                    {gateway.title}
                  </h3>
                  <p className="mt-4 text-sm font-semibold leading-8 text-slate-600 dark:text-slate-300">
                    {gateway.description}
                  </p>

                  <ul className="mt-6 grid gap-3">
                    {gateway.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2 rounded-2xl border border-amber-900/10 bg-[#fffaf1]/75 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700/70 dark:bg-slate-950/35 dark:text-slate-300"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-black text-amber-800 transition-all duration-300 group-hover:gap-3 dark:text-amber-400">
                    <span>{gateway.cta}</span>
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-amber-900/10 bg-white/65 p-5 shadow-xl shadow-amber-900/5 backdrop-blur dark:border-amber-400/10 dark:bg-[#0c111d]/80 dark:shadow-black/20 md:grid-cols-3 sm:p-6">
          {data.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[1.25rem] border border-slate-200 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-700/25 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-amber-500/35"
            >
              <h3 className="text-base font-black text-slate-950 dark:text-[#f8f4ea]">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs font-semibold leading-6 text-slate-500 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
