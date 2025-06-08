"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "./upload";

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

    // Optional cache update
    // revalidatePath("/profile");

    return { success: true };
  } catch (error: any) {
    console.error("❌ saveProfile error:", error);
    return { error: error.message || "Something went wrong" };
  }
};



// export const saveImage=async(formdata:any)=>{
//   try {
//     const {image}=formdata
//     const session=await auth()
//     const userId=session?.user?.id
    
//     await prisma.profile.update({
//       where:{userId},
//       create:{

//       }
//     })

//   } catch (error) {
//     console.log(error);
    
//   }
// }

// export const saveProfile = async (prevState: any, formData: any) => {
//   try {
//     const session = await auth();

//     if (!session?.user?.id) {
//       return { error: "User is not authenticated." };
//     }

//     // Validate required fields
//     if (!formData?.name || !formData?.jobTitle) {
//       return { error: "Name and job title are required." };
//     }

//     let finalImage = null;
//     if (formData.imageUrl) {
//       finalImage = await uploadFile(formData.imageUrl);
//     }

//     // Prepare data for Prisma
//     const profileData: any = {
//       name: formData.name as string,
//       jobTitle: formData.jobTitle as string,
//       skills: formData.skills ? JSON.parse(JSON.stringify(formData.skills)) : [],
//       socialLinks: formData.socialLinks ? JSON.parse(JSON.stringify(formData.socialLinks)) : {},
//     };

//     if (formData.location) profileData.location = formData.location as string;
//     if (formData.bio) profileData.bio = formData.bio as string;
//     if (finalImage) profileData.imageUrl = finalImage as string;
//     if (session.user.name) profileData.customUrl = session.user.name as string;

//     await prisma.profile.upsert({
//       where: { userId: session.user.id },
//       update: profileData,
//       create: {
//         userId: session.user.id,
//         ...profileData
//       },
//     });

//     return { success: true };
//   } catch (error: any) {
//     console.error("❌ saveProfile error:", error);
//     return { error: error.message || "Something went wrong" };
//   }
// };