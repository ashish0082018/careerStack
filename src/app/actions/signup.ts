

"use server"
import { prisma } from "@/lib/prisma"

import {z} from "zod"
import bcrypt from "bcrypt"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
const signupSchema=z.object({
    name: z.string()
    .min(5, { message: "The name must be at least 5 characters long." })
    .regex(/^[a-zA-Z0-9 ]*$/, { message: "The name should not contain any special characters." }),

   email: z.string()
        .email({ message: "Please provide a valid email address." })
        .regex(/^[^@]+@[^@]+\.[^@]+$/, { message: "The email address should be in the correct format (e.g., example@domain.com)." }),

    password: z.string()
        .min(8, { message: "The password must be at least 8 characters long." })
        .regex(/[A-Z]/, { message: "The password must contain at least one uppercase letter." })
      

})

type returnData={
error:{
    name?:string[],
    email?:string[],
    password?:string[],
    formError?:string[],
    success?:string,
    verification?:string,
    
}
}

export const signup=async(prevState:returnData,formdata:FormData): Promise<returnData>=>{

const result=signupSchema.safeParse({
    name:formdata.get("name"),
    email:formdata.get("email"),
    password:formdata.get("password")
})
if(!result.success){
    return { error: result.error.flatten().fieldErrors }
}

try {
const isExists=await prisma.user.findUnique({
    where:{
         email:result.data.email,
         isVerified:true
         
    }
})
if(isExists){
    return {error: {formError:["You have already Registered. Please login your self"]}};
}

const existingUserByEmail=await prisma.user.findUnique({
    where:{
        email:result.data.email
    }
})

const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

if(existingUserByEmail){
    if(existingUserByEmail.isVerified){
        return {error : {formError:["You have already Registered. Please login your self"]}}

    }
    else{
        const hashedPassword = await bcrypt.hash(result.data.password, 10);
        await prisma.user.update({
            where:{
                email:result.data.email
            },
            data:{
                password:hashedPassword,
                verifyCode:verifyCode,
                verifyCodeExpiry:new Date(Date.now() + 3600000)


            }
        }
    
    )
        
    }
   
}
else{
    const hashpassword=await bcrypt.hash(result.data.password,10);
    const expiryDate = new Date();                // return a object which store in expiryDate so use it to manipulate
    expiryDate.setHours(expiryDate.getHours() + 1);   // expires in 1 hour 

     await prisma.user.create({
        data:{
            name:result.data.name,
            email:result.data.email,
            password:hashpassword,
            verifyCode:verifyCode,
            verifyCodeExpiry:expiryDate,
            isVerified:false            
        }
    })
}



const token=await jwt.sign({email:result.data.email},process.env.JWT_SECRET as string,{ expiresIn: "1h" });
(await cookies()).set("auth-email", token);


//  code for emailverification
const emailResponse = await sendVerificationEmail(
    result.data.email,
    result.data.name,
    verifyCode
  );

  if (!emailResponse.success) {
    return {error:{verification: emailResponse.message}}
 }



    return {error:{success:"/verifyotp"}}

    
} catch (error:unknown) {
    if (error instanceof Error) {
        console.log(error);
        
        return {
          error: {
              formError: ["something went wrong"],
          },
        };
      } else {
        console.log(error);
        return {
          error: {
            formError: ["something went wrong"],
          },
        };
      }    
}
console.log("before");



 
}











