import React from 'react'
import Settings from '@/components/setting/Settings';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

type Props = {}

async function page({}: Props) {
 const session=await auth();
 const setting=await prisma.profile.findUnique({
  where:{userId:session?.user?.id},
  select:{
    private:true,
    showEmail:true,
    showLocation:true,
    customUrl:true,
  }
 })
 let isexists=true;
if(!setting) isexists=false;
 const Setting={   
    privacy: {  
      profilePublic: setting?.private,
      showEmail: setting?.showEmail,
      showLocation: setting?.showLocation,
    },
    customDomain: setting?.customUrl || '',
    isexists: isexists
  }


  return (
    <div>

      <Settings setting={Setting} />
    </div>
  )
}

export default page