"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

    
    
    export const handleDisconnect=async()=>{
        const session=await auth();
        const userId=session?.user?.id;
         // Step 1: Get current value of `connect`
  const existing = await prisma.gitHubProfile.findUnique({
    where: { userId },
    select: { connect: true },
  });

  // Step 2: Toggle it
  const updated = await prisma.gitHubProfile.update({
    where: { userId },
    data: {
      connect: !existing?.connect, // invert the boolean
    },
  });
  redirect("/github")
    }