import { DashboardLayout } from "@/components/home/DashboardLayout";
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}