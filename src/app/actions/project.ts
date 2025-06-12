// app/actions/project.ts
"use server";

import { auth } from "@/auth";
import { uploadFile } from "./upload";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache"; // ✅ Use this instead

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

    if (!image) return { error: "No image uploaded." };

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

    revalidateTag("projects"); // ✅ Clear cached project data for all users

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await prisma.project.delete({ where: { id: projectId } });
    revalidateTag("projects"); // ✅ Clear cache
  } catch (error) {
    console.log(error);
  }
};

export const updateFeatured = async (projectId: string) => {
  try {
    const findProject = await prisma.project.findUnique({ where: { id: projectId } });
    await prisma.project.update({
      where: { id: projectId },
      data: { featured: !findProject?.featured },
    });
    revalidateTag("projects"); // ✅ Invalidate cache
    revalidateTag("dashboard"); 

  } catch (error) {
    console.log(error);
  }
};
