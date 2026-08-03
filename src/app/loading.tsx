import { GridSkeleton } from "src/components/ui/SkeletonLoader";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Mock search bar pulse */}
      <div className="max-w-4xl mx-auto mb-10 h-14 bg-slate-100 dark:bg-slate-800/50 rounded-2xl animate-pulse" />
      {/* Reusable Grid skeleton loader */}
      <GridSkeleton count={6} />
    </div>
  );
}
