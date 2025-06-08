"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProfile=async(profileId:string)=>{
    try {
        await prisma.profile.delete({
            where:{
                id:profileId
            }
        })
        revalidatePath("/profiles")
    } catch (error) {
        console.log(error);
        
    }
}