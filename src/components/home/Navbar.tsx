"use client";
import React, { useState } from "react";
import Link from "next/link";
import NavbarShow from "./Navbar_Show";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Navbar() {
  const session = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full flex justify-between mx-5 sm:mx-10 text-zinc-100 ">
      {/* Logo with Dropdown on Mobile */}
      <div className="tracking-tighter font-semibold text-xl flex justify-center items-center sm:relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden hover:border-b-2">
              ProfileX
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-3 p-2 w-40">
            <Link
              className={`hover:border-b transition ${
                pathname === "/" ? "border-b-2" : ""
              }`}
              href="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              className={`hover:border-b transition ${
                pathname === "/about" ? "border-b-2" : ""
              }`}
              href="/about"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              className={`hover:border-b transition ${
                pathname === "/contact" ? "border-b-2" : ""
              }`}
              href="/contact"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {session.data && (
              <>
                <Link
                  className={`hover:border-b transition ${
                    pathname === "/dashboard" ? "border-b-2" : ""
                  }`}
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                >
                  Create
                </Link>
                <Link
                  className={`hover:border-b transition ${
                    pathname === "/profiles" ? "border-b-2" : ""
                  }`}
                  href="/profiles"
                  onClick={() => setIsOpen(false)}
                >
                  Your Profiles
                </Link>
              </>
            )}
          </PopoverContent>
        </Popover>

        <Link href={"/"} className="hidden sm:block">
          ProfileX
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-7 justify-center items-center">
        <Link
          className={`hover:border-b transition ${
            pathname === "/about" ? "border-b-2" : ""
          }`}
          href="/about"
        >
          About
        </Link>
        <Link
          className={`hover:border-b transition ${
            pathname === "/contact" ? "border-b-2" : ""
          }`}
          href="/contact"
        >
          Contact
        </Link>
        {session.data && (
          <>
            <Link
              className={`hover:border-b transition ${
                pathname === "/dashboard" ? "border-b-2" : ""
              }`}
              href="/dashboard"
            >
              Create
            </Link>
            <Link
              className={`hover:border-b transition ${
                pathname === "/profiles" ? "border-b-2" : ""
              }`}
              href="/profiles"
            >
              Your Profiles
            </Link>
          </>
        )}
      </div>

      {/* Avatar and Auth Buttons */}
      <div className="flex gap-5 justify-center items-center">
        <NavbarShow />
      </div>
    </div>
  );
}

export default Navbar;
