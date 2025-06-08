"use client";
import React, { startTransition, useActionState, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Linkedin } from "../../../public/icons/Linkedin";
import { Github } from "../../../public/icons/Github";
import { Twitter } from "../../../public/icons/Twitter";
import { Gmail } from "../../../public/icons/Instagram";
import { Delete } from "../../../public/icons/Delete";
import { createProfile } from "@/app/actions/createprofile";
import Template from "./Template";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import Buttonfor_form from "./Button_for_submit";
import { updateProfile } from "@/app/actions/updateprofile";

type Profile = { name: string; link: string; icon: React.JSX.Element };

function EditProfile1({data}:any) {
  const router = useRouter();



  const options = [
    { icon: <Linkedin />, name: "LinkedIn" },
    { icon: <Github />, name: "GitHub" },
    { icon: <Twitter />, name: "Twitter" },
    { icon: <Gmail />, name: "Gmail" },
  ];
  const [name, setName] = useState(data.name);
  const [message, setMessage] = useState(data.message);
  const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>(data.link);

 

  type formdata = {
   
    name: string;
    message: string;
  
  };

  

  const [formState, action,pending] = useActionState(updateProfile, { error: {} });

  if (formState.error.success) {
    router.push(`/profile/${data.slug}`);
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: formdata = { 
      name,
      message,
    };

    startTransition(() => {
      action({ formdata: formData, slug: data.slug });
    });
  };



  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row justify-between items-center gap-5 container mx-auto text-black p-4">
      <ToastContainer />
      <div className="w-full md:w-1/4 md:fixed md:top-10 md:left-12">
        <Template
          name={name}
          message={message}
          selectedProfiles={selectedProfiles}
          imagepreview={data.image}
        />
      </div>
      <div className="w-full md:w-2/3 bg-zinc-200 flex items-center justify-center rounded-xl shadow-xl p-4">
        <div className="w-full">
          <div className="px-4 md:px-12 py-5">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl tracking-tighter font-bold text-zinc-700">
                Update Your Profile
              </h2>
              <h5 className="text-zinc-600 mt-2 text-sm md:text-base">
                After the space is updated, it will generate a updated page
                for your profile.
              </h5>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-6">
             

              <label className="text-sm tracking-tighter font-semibold">
                Name
              </label>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="px-2 py-1 border-2 border-gray-300 rounded-md outline-none w-full"
              />
              {formState.error.formerror && typeof formState.error.formerror === "object" && 
                <div className="text-red-500 text-sm">
                  {"name" in formState.error.formerror && 
                    Array.isArray(formState.error.formerror.name) && (
                      <p>{formState.error.formerror.name[0]}</p>
                  )}
                </div>
              }

              <label className="text-sm tracking-tighter font-semibold">
                Your custom message
              </label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="px-2 py-1 border-2 border-gray-300 rounded-md outline-none w-full"
              />
              {formState.error.formerror && typeof formState.error.formerror === "object" && 
                <div className="text-red-500 text-sm">
                  {"message" in formState.error.formerror && 
                    Array.isArray(formState.error.formerror.message) && (
                      <p>{formState.error.formerror.message[0]}</p>
                  )}
                </div>
              }

             
           <button 
           disabled={pending}
                type="submit"
                className="bg-purple-700 mt-4 w-fit  rounded-md px-3 py-1 text-zinc-200 hover:bg-purple-700 transition hover:shadow-xl"
              >
            {pending? <>Updating...</>:"Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile1;