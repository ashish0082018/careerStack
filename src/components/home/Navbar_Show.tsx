"use client";
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from 'next/link';

function NavbarShow() {
  const session = useSession();


  let authContent: React.ReactNode;

  if (session.status === "loading") return <div> 

<div className="flex space-x-1">
      <div className="w-2 h-2 bg-purple-800 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-purple-800 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-purple-800 rounded-full animate-bounce"></div>
    </div>
  </div>; // Nothing will reflect during the data fetching of the user

  if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger asChild>
          
          <Avatar className='hover:cursor-pointer'>
          
            <AvatarImage src={session.data.user.image || undefined } />
            <AvatarFallback> CN </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className='hover:cursor-pointer'>
          <h2 className='text-lg mb-2 font-semibold tracking-tight w-fit '>{session.data.user.name}</h2>
          <button className='bg-purple-800 hover:bg-purple-900 shadow-lg text-md text-zinc-100 px-3 py-1 rounded-md border-none'  onClick={()=>signOut()} >Logout</button>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <div className='flex gap-5 justify-center items-center'>
        <Link href={"/signin"}>
        <button className='bg-purple-800 hover:bg-purple-900 shadow-lg text-md text-zinc-100 px-3 py-1 rounded-md border-none'  >Sign in</button>
        </Link>
        <Link href={"/signup"}>
        <button className='bg-purple-800 hover:bg-purple-900 shadow-lg text-md text-zinc-100 px-3 py-1 rounded-md border-none hover:bg-transparent hover:border-2 hover:border-white transition'  >Sign up</button>

        </Link>
      </div>
      
    );
  }

  return authContent; // Ensure this is inside the function and properly returned after the logic
}

export default NavbarShow;
