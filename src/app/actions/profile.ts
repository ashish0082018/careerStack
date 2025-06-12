"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { uploadFile } from "./upload";
import { revalidateTag } from "next/cache";

export const saveProfile = async (prevState: any, formdata: any) => {
  try {
    const session = await auth();

    const { name, jobTitle, location, bio, imageUrl, skills, socialLinks } =
      formdata;

    if (!session?.user?.id) {
      return { error: "User is not authenticated." };
    }
    let finalImage;
    if(!imageUrl){
      const findProfile=await prisma.profile.findUnique({
        where:{userId:session.user.id},
        select:{
          imageUrl:true
        }
      })
      finalImage=findProfile?.imageUrl;
    }
    else{
      finalImage = await uploadFile(imageUrl as File);
      }
    
const customUrl=session.user.name?.split(" ")[0];   // it can change by the user from settings


    await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        name: name as string,
        location: location as string,
        bio: bio as string,
        jobTitle: jobTitle as string,
        imageUrl: finalImage as string,
        skills: skills as any,
        socialLinks: socialLinks as any, 
        customUrl,
      },
      create: {
        userId: session.user.id,
        name: name as string,
        location: location as string,
        bio: bio as string,
        jobTitle: jobTitle as string,
        imageUrl: finalImage as string,
        skills: skills as any,
        socialLinks: socialLinks as any,
        customUrl,
      },
    });

 revalidateTag("profile"); 

    return { success: true };
  } catch (error: any) {
    console.error("❌ saveProfile error:", error);
    return { error: error.message || "Something went wrong" };
  }
};


