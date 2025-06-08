"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

function Home() {
  const { data: session } = useSession();

  return (
    <>
   
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-6 mb-20 md:mb-20">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {session ?  <>Welcome  <span className="text-purple-700 hover:cursor-pointer hover:border-b">{session.user?.name?.split(" ")[0]} !  </span> </> : "Create & Share Your Profile"}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto">
          Showcase your skills, achievements, and connect with others effortlessly.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 p-6 bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl shadow-lg text-center mb-20 md:mb-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold">Start Building Your Profile</h2>
        <p className="text-gray-200 mt-2">Get started in just a few clicks.</p>
        <button className="mt-4 px-6 py-2 bg-white text-purple-800 rounded-lg font-semibold hover:scale-105 transition">
          {session ? <Link href={"/dashboard"}>Go to Dashboard</Link>: <> <Link href={"/dashboard"}>Create Profile</Link> </> }
        </button> 
      </motion.div>
    </div>
 
    </>
  );
}

export default Home;