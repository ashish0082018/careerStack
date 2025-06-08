import React from 'react'
import { prisma } from '@/lib/prisma'
import PublicProfile from './Publicprofile'
import PrivateProfile from './Privateprofile'
import { auth } from '@/auth'

type Props = {
  params: { slug: string }
}

async function Page({ params }: Props) {
  const { slug } = params

  const profile = await prisma.profile.findUnique({
    where: { customUrl: slug },
    select: {
      userId: true,
      name: true,
      jobTitle: true,
      location: true,
      bio: true,
      skills: true,
      imageUrl: true,
      socialLinks: true,
      createdAt: true,
      private: true,
      showEmail:true,
      showLocation:true,

    },
  })

  if (!profile) return <div>User Not Found</div>
const session=await auth()

if (!profile.private && session?.user && session.user.id !== profile.userId  || !session?.user) {
    await prisma.profile.update({
    where: { customUrl: slug },
    data: {
      profileViews: { increment: 1 },
    },
  })
}

  const github = await prisma.gitHubProfile.findUnique({
    where: { userId: profile.userId },
    select: {
      totalStars: true,
      totalRepos: true,
      totalContributions: true,
      followers:true
    },
  })

  const projects = await prisma.project.findMany({
    where: { userId: profile.userId },
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
  })

  const socialLinks =
    typeof profile.socialLinks === 'object' && profile.socialLinks !== null
      ? (profile.socialLinks as {
          github?: string
          linkedin?: string
          twitter?: string
          website?: string
        })
      : {}

  const transformedProfile = {
    name: profile.name,
    username: slug,
    jobTitle: profile.jobTitle,
    location: profile.location,
    imageUrl: profile.imageUrl ?? '',
    joinedDate: profile.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    }),
    bio: profile.bio,
    skills: profile.skills,
    socialLinks: {
      github: socialLinks.github ?? '',
      linkedin: socialLinks.linkedin ?? '',
      twitter: socialLinks.twitter ?? '',
      website: socialLinks.website ?? '',
    },
    stats: {
      githubStars: github?.totalStars ?? 0,
      repositories: github?.totalRepos ?? 0,
      followers: github?.followers ?? 0,
      totalContributions:github?.totalContributions ?? 0,
    },
    featuredProjects: projects
      .filter((p) => p.featured)
      .map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        technologies: p.technologies,
        stars: 0,
        forks: 0,
        liveUrl: p.liveUrl ?? '',
        githubUrl: p.githubUrl ?? '',
        image: p.image ?? '',
      })),
      privacy:{
        showEmail: profile.showEmail,
        showLocation: profile.showLocation,
      }
  }

  return (
    <div>
     {profile.private ? <PrivateProfile/>: <PublicProfile profile={transformedProfile} /> }
    </div>
  )
}

export default Page
