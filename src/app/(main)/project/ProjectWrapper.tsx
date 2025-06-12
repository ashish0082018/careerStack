// app/your-route/ProjectsWrapper.tsx
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Projects from '@/components/project/Project';
import { unstable_cache } from 'next/cache';

const getProjects = unstable_cache(
  async (userId: string) => {
    return await prisma.project.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        technologies: true,
        category: true,
        githubUrl: true,
        liveUrl: true,
        image: true,
        featured: true,
      },
    });
  },
   ['projects-data'],
  { tags: ["projects"], revalidate: false } 
);

export default async function ProjectsWrapper() {
  const session = await auth();
  const userId = session?.user?.id;

  const projects = await getProjects(userId!);
  return <Projects initialProjects={projects} />;
}
