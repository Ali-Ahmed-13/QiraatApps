'use client';

import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div
      className={`transition-all duration-150 ease-out transform ${
        isMounted
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-1'
      }`}
    >
      {children}
    </div>
  );
}
