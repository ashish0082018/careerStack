
"use client"
import { Header } from "@/components/home/Header";
import { Sidebar } from '@/components/home/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 md:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}
