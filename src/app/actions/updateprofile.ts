// 

"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";


// Zod schema for profile validation


// Zod schema for form validation
const formSchema = z.object({
  
  name: z.string().min(5, { message: "Name must be greater than 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Write a message with more than 10 characters" })
    .max(150, { message: "Write a message with less than 150 characters" }),
 
});

// Type for form data
type FormData = {
  
  name: string;
  message: string;
  
};

// Type for return data
type returnData = {
  error: {
    message?: string[];
    formerror?: object;
    success?: boolean;
   
  };
};

// Function to generate a unique slug
// const generateSlug = (name: string) => {
//   const first = name.split(" ")[0];
//   const randomint = Math.floor(Math.random() * 1000 + 99);
//   return first + randomint;
// };

// Server action to create a profile
type update={
    formdata:FormData,
    slug:string
  }
export const updateProfile = async (prevState: returnData, data: update): Promise<returnData> => {

 
  
 
  try {
    // Validate form data using Zod
   
    
    const result = formSchema.safeParse({
      name: data.formdata.name,
      message: data.formdata.message,
    });

    // If validation fails, return errors
    

    if (!result.success) {
      return { error: { formerror: result.error.flatten().fieldErrors } };
    }
  
    
   await prisma.profile.update({
    where:{
        slug:data.slug
    },
    data:{
        name:result.data.name,
        message:result.data.message,
    }
   })


    // Return success message and slug
    return {
      error: {
        message: ["Successfully Updated the profile"],
        success: true,
      
      },
    };
  } catch (error) {
    if (error) {
      console.log(error); // Log the error if it is not null
    } else {
      console.log("Unknown error occurred."); // Handle the case where the error is null or undefined
    }
    
  
    return { error: { message: ["Something went wrong"] } };
  }
};