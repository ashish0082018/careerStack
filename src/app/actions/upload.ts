"use server"

import { Uploadimage } from "@/lib/upload-image";

export const uploadFile = async (file: File):Promise<string> => {
// eslint-disable-next-line
  const uploadresult:any=await Uploadimage(file,"NODEE") ;
  
  return String(uploadresult.secure_url)
};
