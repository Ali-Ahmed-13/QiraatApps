import React from 'react';

/**
 * Islamic Star Pattern (8-point geometric star / Khatam Sulayman)
 * Clean, lightweight, scalable SVG motif.
 */
export function IslamicStarPattern({
  className = 'w-32 h-32 text-amber-500/15',
  strokeWidth = 1.2,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer subtle circular aura */}
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth={strokeWidth} />
      
      {/* Primary 8-point star (Square 1) */}
      <rect
        x="38"
        y="38"
        width="124"
        height="124"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Primary 8-point star (Square 2 rotated 45 deg) */}
      <rect
        x="38"
        y="38"
        width="124"
        height="124"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        transform="rotate(45 100 100)"
      />

      {/* Secondary inner star */}
      <rect
        x="55"
        y="55"
        width="90"
        height="90"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.9}
        transform="rotate(22.5 100 100)"
      />
      <rect
        x="55"
        y="55"
        width="90"
        height="90"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.9}
        transform="rotate(67.5 100 100)"
      />

      {/* Center rosette */}
      <circle cx="100" cy="100" r="42" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="100" cy="100" r="22" stroke="currentColor" strokeWidth={strokeWidth * 0.9} />
      <circle cx="100" cy="100" r="8" fill="currentColor" fillOpacity="0.3" />

      {/* Diagonal & orthogonal connecting lines */}
      <line x1="100" y1="8" x2="100" y2="192" stroke="currentColor" strokeWidth={strokeWidth * 0.7} />
      <line x1="8" y1="100" x2="192" y2="100" stroke="currentColor" strokeWidth={strokeWidth * 0.7} />
      <line x1="35" y1="35" x2="165" y2="165" stroke="currentColor" strokeWidth={strokeWidth * 0.7} />
      <line x1="165" y1="35" x2="35" y2="165" stroke="currentColor" strokeWidth={strokeWidth * 0.7} />
    </svg>
  );
}

/**
 * Mosque Skyline Silhouette
 * Majestic minarets and domes silhouette for the dark navy header and footer sections.
 */
export function MosqueSilhouette({
  className = 'w-full h-24 text-sky-900/30',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background soft low structures */}
      <path
        opacity="0.5"
        d="M0 160V140H120V125H160V140H320V110H380V140H600V135H720V140H860V120H920V140H1080V130H1140V140H1200V160H0Z"
      />

      {/* Main silhouettes with domes and minarets */}
      <path d="M0 160V145H40V60L46 45L52 60V145H90V130C90 115 110 100 135 100C160 100 180 115 180 130V145H230V50L236 30L242 50V145H320V135C320 120 340 105 370 105C400 105 420 120 420 135V145H520V40L525 22L530 15L535 22L540 40V145H610V120C610 90 645 65 690 65C735 65 770 90 770 120V145H840V35L845 18L850 10L855 18L860 35V145H950V130C950 115 970 98 1000 98C1030 98 1050 115 1050 130V145H1110V55L1116 38L1122 55V145H1200V160H0Z" />

      {/* Crescents atop minarets & central dome */}
      <circle cx="530" cy="10" r="3.5" opacity="0.9" />
      <circle cx="690" cy="58" r="4.5" opacity="0.9" />
      <circle cx="850" cy="6" r="3.5" opacity="0.9" />
    </svg>
  );
}

/**
 * Islamic Corner Arabesque
 * Delicate corner watermark for navbar cards and footer panels.
 */
export function IslamicCornerPattern({
  className = 'w-24 h-24 text-stone-400/20',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 0C30 0 60 12 75 35C90 58 100 80 100 100M0 25C20 25 45 35 55 50C65 65 75 80 75 100M0 50C15 50 30 60 40 72C50 84 50 90 50 100"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />
      <circle cx="25" cy="25" r="16" stroke="currentColor" strokeWidth="1" />
      <rect x="14" y="14" width="22" height="22" stroke="currentColor" strokeWidth="0.8" transform="rotate(45 25 25)" />
      <circle cx="25" cy="25" r="4" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}
