// "use server"
// import { auth } from "@/auth";
// import { uploadFile } from "./upload";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";

// export const project=async(prevState:any,formData:any)=>{
//     try {
//         const session=await auth()
//         const { title,description,technologies,category,liveUrl,githubUrl,featured,image}=formData;
//         console.log("data aaya",formData);
        
//             if (!session?.user?.id) {
//       return { error: "User is not authenticated." };
//     }
//         const finalImage= await uploadFile(image as File);
        
//         await prisma.project.create({
//             data:{
//                 title,
//                 userId:session.user.id,
//                 description,
//                 image:finalImage,
//                 technologies,
//                 category,
//                 liveUrl,
//                 githubUrl,
//             }
//         })

//         revalidatePath("/project")
//     } catch (error) {
//         console.log(error);
        
//     }
// }

"use server";
import { auth } from "@/auth";
import { uploadFile } from "./upload";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const project = async (_: any, formData: FormData) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "User is not authenticated." };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const technologies = (formData.get("technologies") as string || "")
      .split(",")
      .map((t) => t.trim());
    const category = formData.get("category") as string;
    const liveUrl = formData.get("liveUrl") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const image = formData.get("image") as File;

    if (!image) {
      return { error: "No image uploaded." };
    }

    const finalImage = await uploadFile(image);

    await prisma.project.create({
      data: {
        title,
        userId: session.user.id,
        description,
        image: finalImage,
        technologies,
        category,
        liveUrl,
        githubUrl,
      },
    });

    revalidatePath("/project");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};


export const deleteProject=async(projectId:string)=>{
    try {
        await prisma.project.delete({
            where:{id:projectId}
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateFeatured=async(projectId:string)=>{
  try {
    const findProject=await prisma.project.findUnique({where:{id:projectId}})
    await prisma.project.update({
      where:{id:projectId},
        data:{
          featured:!findProject?.featured
        }
      
    })
  } catch (error) {
    console.log(error);
    
  }
}