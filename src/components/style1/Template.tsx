"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type selectProfile = { name: string; link: string; icon: React.JSX.Element }[];
type templatedata = {
  imagepreview: string;
  name: string;
  message: string;
  selectedProfiles: selectProfile;
};

function Template({ name, message, selectedProfiles, imagepreview }: templatedata) {
  return (
    <div className="w-full md:w-full mt-10 bg-zinc-100 rounded-xl overflow-hidden shadow-xl shadow-purple-800">
      <div className="min-h-1/2 px-4 md:px-10 py-10 border border-zinc-500 shadow-xl rounded-md flex flex-col gap-5">
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-full overflow-hidden flex justify-center items-center bg-cover bg-center shadow-xl shadow-purple-300 hover:scale-105 transition"
            style={{ backgroundImage: `url(${imagepreview})` }}
          ></div>
        </div>
        <div className="text-center overflow-hidden">
          <h1 className="text-2xl md:text-3xl tracking-tighter font-bold text-zinc-700 min-h-10 max-w-full break-words whitespace-normal">
            {name}
          </h1>
          <h6 className="text-zinc-500 min-h-7 h-full break-words whitespace-normal text-sm md:text-base">
            {message}
          </h6>
        </div>
        <h3 className="text-lg tracking-tighter font-bold text-zinc-700 mt-5">
          Profiles
        </h3>
        <div className="flex justify-evenly mx-auto gap-2">
          {selectedProfiles.length < 1 ? (
            <div className="rounded-full w-12 h-12 flex justify-center items-center">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </div>
          ) : (
            selectedProfiles.map((elem, key) => (
              <div key={key} className="rounded-full w-12 h-12 flex justify-center items-center overflow-hidden shadow-lg">
                <a href={elem.link}>{elem.icon}</a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Template;