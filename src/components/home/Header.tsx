
"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


import { useTheme } from 'next-themes';
import { User, Settings, LogOut, Moon, Sun, Menu } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export function Header() {

const session= useSession()
const user=session.data?.user
  const { setTheme,theme } = useTheme()
    



  return (
    <header className="border-b-2 shadow-md  flex items-center justify-center  backdrop-blur supports-[backdrop-filter]:bg-zinc-100 dark:bg-black">
      <div className="container flex h-14 items-center">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
           
  <Image
    src="/cs-logo.jpg"
    alt="CareerStack Logo"
    width={40}
    height={40}
    priority
  />

          </div>
          <span className="font-bold text-lg sm:text-xl hidden sm:block">CareerStack</span>
        </Link>
        
        <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
              <Button
      variant="ghost"
      size="icon"
      onClick={() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }}
      className="h-8 w-8 sm:h-10 sm:w-10"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user.name ?? ''} />
                    <AvatarFallback className="text-xs">
                      { user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '' }
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/profile"}> <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                 Profile
                </DropdownMenuItem></Link>
                <Link href={"/setting"}>  <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                 Settings
               
                 
                </DropdownMenuItem></Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>signOut({ callbackUrl: "/" })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href={"/signin"}>Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={"/signup"}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
