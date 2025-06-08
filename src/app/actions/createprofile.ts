// 

"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { uploadFile } from "./upload";
import { auth } from "@/auth";
import { Profile } from "@prisma/client";

// Zod schema for profile validation
const profileschema = z.object({
  name: z.string().min(4, { message: "Select a valid field" }),
  link: z.string().min(1, { message: "Enter profile link" }).url({ message: "Link must be a valid URL" }),
});

// Zod schema for form validation
const formSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "Only PNG and JPEG files are allowed",
    })
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: "File size must be less than 1 MB",
    }),
  name: z.string().min(5, { message: "Name must be greater than 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Write a message with more than 10 characters" })
    .max(250, { message: "Write a message with less than 250 characters" }),
  profiles: z.array(profileschema).min(1, { message: "At least one profile is required" }),
});

// Type for form data
type FormData = {
  image: File;
  name: string;
  message: string;
  profiles: { name: string; link: string }[];
};

// Type for return data
type returnData = {
  error: {
    message?: string[];
    formerror?: object;
    success?: boolean;
    slug?: string;
  };
};

// Function to generate a unique slug
const generateSlug = (name: string) => {
  const first = name.split(" ")[0];
  const randomint = Math.floor(Math.random() * 1000 + 99);
  return first + randomint;
};

// Server action to create a profile
export const createProfile = async (prevState: returnData, formData: FormData): Promise<returnData> => {
 

  let newProfile: Profile;
  try {
    // Validate form data using Zod
    const result = formSchema.safeParse({
      image: formData.image,
      name: formData.name,
      message: formData.message,
      profiles: formData.profiles,
    });

    // If validation fails, return errors
    if (!result.success) {
      return { error: { formerror: result.error.flatten().fieldErrors } };
    }

    // Upload the image file
    if (!result.data) return { error: { message: ["Something went wrong"] } };
    const finalImage = await uploadFile(result.data.image);

    // Get the current session
    const session = await auth();
    if (!session?.user) return { error: { message: ["No user logged in"] } };

    // Create the new profile
    newProfile = await prisma.profile.create({
      data: {
        authorId: session.user.id as string,
        slug: generateSlug(result.data.name),
        image: finalImage,
        name: result.data.name,
        message: result.data.message,
        link: result.data.profiles, // Storing as JSON
      },
    });

    // Return success message and slug
    return {
      error: {
        message: ["Successfully created the profile"],
        success: true,
        slug: newProfile.slug,
      },
    };
  } catch (error) {
    if (error) {
      console.log(error); // Log the error if it is not null
    } else {
      console.log("Unknown error occurred."); // Handle the case where the error is null or undefined
    }
    
    // console.error("Error creating profile:", error);
    return { error: { message: ["Something went wrong"] } };
  }
};