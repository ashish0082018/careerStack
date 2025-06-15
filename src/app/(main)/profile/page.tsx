import React, { Profiler } from 'react'
import Profile from '@/components/profile/Profile'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

type Props = {}

async function page({}: Props) {
  const session=await auth()
  const profile=await prisma.profile.findUnique({
    where:{
      userId:session?.user?.id
    }

  })



  return (
    <div>
      <Profile initialProfile={profile} />
    </div>
  )
}

export default page