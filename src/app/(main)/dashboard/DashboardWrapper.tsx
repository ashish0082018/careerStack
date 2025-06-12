
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

const getDashboardData = unstable_cache(
  async (userId: string) => {
    const [profile, github, projectCount] = await Promise.all([
      prisma.profile.findUnique({
        where: { userId },
        select: { profileViews: true },
      }),
      prisma.gitHubProfile.findUnique({
        where: { userId },
        select: { totalStars: true },
      }),
      prisma.project.count({
        where: { userId },
      }),
    ]);

    let arr: Array<string> = [];
    if (profile){
         arr.push('profile');
        arr.push('profile');
    }
    if (github) arr.push('github');
    if (projectCount > 0) arr.push('projects');

    return {
      profileViews: profile?.profileViews || '-',
      totalStars: github?.totalStars || '-',
      projects: projectCount || '-',
      arr,
    };
  },
  ["dashboard"], 
  { tags: ['dashboard'], revalidate: false }
);

export default async function DashboardWrapper() {
  const session = await auth();
  const userId = session?.user?.id;

  const dashboardData = await getDashboardData(userId!);

  return (
 
      <Dashboard detail={dashboardData} />
   
  );
}
