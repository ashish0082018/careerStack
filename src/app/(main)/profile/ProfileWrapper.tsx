
import React, { Suspense } from 'react';
import Profile from '@/components/profile/Profile';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { Loadingpage } from '@/components/loaders/Loadingpage';
import { unstable_cache } from 'next/cache';

const getProfile = unstable_cache(
  async (userId: string) => {
    return await prisma.profile.findUnique({
      where: { userId },
    });
  },
  ["profile"], 
  { tags: ["profile"], revalidate: false } 
);

export default async function ProfileWrapper() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const profile = await getProfile(userId);

  return (
    <Suspense fallback={<Loadingpage />}>
      <Profile initialProfile={profile} />
    </Suspense>
  );
}
