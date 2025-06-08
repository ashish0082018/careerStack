"use client";
import React, { useActionState} from "react";
import { verifyOtp } from "@/app/actions/verifycode";
import { redirect } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import { toast } from "react-toastify";
import EmailVerification from "./Verifyotp";
// import * as React from "react"
 

const Page = () => {
 
const [formData,action,pending]=useActionState(verifyOtp,{message:""})
if(formData.success){

 toast("Sign in yourself")
  redirect("/signin")
}
  return (
    <>

<EmailVerification/>
    </>
    
  );
};

export default Page;
