'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import Loading from '@/components/main-layout/Loading';

const FixedLayout = dynamic(() => import('@/components/main-layout/FixedLayout'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function ClientFixedLayout({ children }: { children: ReactNode }) {
  return <FixedLayout>{children}</FixedLayout>;
}
