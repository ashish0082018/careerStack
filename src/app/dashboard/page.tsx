import React from 'react'
import Dashboard from './Dashboard'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma';

type Props = {}

async function page({}: Props) {
const session=await auth();
const profile=await prisma.profile.findUnique({
    where:{userId:session?.user?.id},
    select:{
        profileViews:true,
    }
})

const github=await prisma.gitHubProfile.findUnique({
    where:{userId:session?.user?.id},
    select:{
        totalStars:true,
    }
})

const projects=await prisma.project.count({
    where:{userId:session?.user?.id}})

let arr:Array<string>=[];
if(profile) {
    arr.push("profile");
    arr.push("profile");
}
if(github) arr.push("github");
if(projects > 0) arr.push("projects");

const dashboardData={
    profileViews:profile?.profileViews || "-",
    totalStars:github?.totalStars || "-",
    projects:projects || "-",
    arr
}
  return (
   <>
   <Dashboard detail={dashboardData} />
   </>
  )
}

export default page