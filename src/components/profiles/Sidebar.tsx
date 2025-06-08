"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transform transition-transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:flex md:w-64`}
      >
        <ul className="space-y-4">
          <li className="p-2 hover:bg-gray-700 rounded"> <Link href={"/"}>Home</Link> </li>
          <li className="p-2 hover:bg-gray-700 rounded"> <Link href={"/about"}>About</Link> </li>
     
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Menu button for mobile */}
      {!isOpen &&
      <button
        className="fixed top-10 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
      
 <Menu size={24} />
      </button>}
    </div>
  );
}
