// import { sendConfirmationEmail } from '@/helpers/sendConfirmationEmail';
"use server"

import { prisma } from "@/lib/prisma"
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"


type formdata={
    message?:string
    success?:boolean
}





export const verifyOtp=async (prevState:formdata,formotp: FormData):Promise<formdata> =>{
    try {
        const code=formotp.get("otp")
       
        
        if (!code) return { message: "OTP is required" };

        const token= (await cookies()).get("auth-email")?.value;
        if(!token) return  {message:"Something went wrong"};
        const data=  jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        const email=data.email as string
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        })

        if (!user) {
            return {message:"User not exists"};
          } 

          const isCodeValid = user.verifyCode === code  ;
          const isCodeNotExpired = new Date(user.verifyCodeExpiry ||"") > new Date();

          if(isCodeNotExpired && isCodeValid){
            await prisma.user.update({
                where:{
                    email
                },
                data:{
                    isVerified:true
                }
            })
            ;
            (await cookies()).delete("auth-email")

            return { message: 'Account verified successfully',success:true }
               
            
          }
          else if(!isCodeNotExpired){
            (await cookies()).delete("auth-email")
            return {message:'Verification code has expired. Please sign up again to get a new code.'}

          }
          else{
            (await cookies()).delete("auth-email")
            return {message: 'Incorrect verification code'}
          }
        

    } catch (error) {
        console.log(error);
     return {message:"something went wrong"}   
    }

}