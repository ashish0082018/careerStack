// app/your-route/page.tsx
import { Suspense } from 'react';
import { Loadingpage } from '@/components/loaders/Loadingpage';
import DashboardWrapper from './DashboardWrapper';

export default function Page() {
  return (
    <Suspense fallback={<Loadingpage/>}>
      < DashboardWrapper />
    </Suspense>
  );
}
