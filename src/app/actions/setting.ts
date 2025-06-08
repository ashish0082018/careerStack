"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";


type FormError = {
    success?: boolean
    error:{
        
        message?: string;
    }
}

export const setCustomurl=async(prevState:FormError,formData:FormData)=>{
    try {
        const session=await auth();
        const newUrl=formData.get("customDomain")
        console.log(newUrl, "  aa gya");
        
        const existingProfile = await prisma.profile.findUnique({
            where:{
                customUrl:newUrl as string
            }
        })
        if(existingProfile){
            return {error: {message:"This custom URL is already taken. Please choose a different one."}, success:false};}

        await prisma.profile.update({
            where:{
                userId:session?.user?.id
            },
            data:{
                customUrl:newUrl as string
            }
        })
            return {error: {message:"Successfully changed your domain..."}, success:true};
            
    } catch (error) {
        console.log("Error in setCustomurl action:", error);
        
    }
}


export const setPrivate=async(status:boolean)=>{
    try {
         const session=await auth();
         await prisma.profile.update({
            where:{
                userId:session?.user?.id},
                data:{
                    private:status
                }
         })
    } catch (error) {
        console.log("Error in setPrivate action:", error);
    }
}


export const setEmail=async(status:boolean)=>{
    try {
         const session=await auth();

         await prisma.profile.update({
            where:{
                userId:session?.user?.id},
                data:{
                    showEmail:status
                }
         })
    } catch (error) {
        console.log("Error in setPrivate action:", error);
    }
}


export const setLocation=async(status:boolean)=>{
    try {
         const session=await auth();
         await prisma.profile.update({
            where:{
                userId:session?.user?.id},
                data:{
                    showLocation:status
                }
         })
    } catch (error) {
        console.log("Error in setPrivate action:", error);
    }
}