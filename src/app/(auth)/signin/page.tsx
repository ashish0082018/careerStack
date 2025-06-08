"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Login from "./Signin";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);  // Start loading state
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, 
    });

    setLoading(false); 

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/"; // Redirect after successful login
    }
  };

  return (
    <>
<Login/>
    </>
  );
}

export default Page;
