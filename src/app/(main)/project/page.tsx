// app/your-route/page.tsx
import { Suspense } from 'react';
import ProjectsWrapper from './ProjectWrapper';
import { Loadingpage } from '@/components/loaders/Loadingpage';

export default function Page() {
  return (
    <Suspense fallback={<Loadingpage />}>
      <ProjectsWrapper />
    </Suspense>
  );
}
