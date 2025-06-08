"use client"
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { deleteProfile } from '@/app/actions/deleteprofile'
import { useRouter } from 'next/navigation'

function Delete({elem}:any) {
    const router=useRouter();
  return (
    <div>

<AlertDialog >
            
            <AlertDialogTrigger asChild>
              {/* <Button variant="outline"></Button> */}
              <button className='bg-red-600 px-10 py-1 rounded-lg hover:bg-red-700 transition font-semibold tracking-tighter'>delete</button>
      
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <span className='text-purple-800'>Are you absolutely sure?</span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                 profile and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='text-purple-800'>Cancel</AlertDialogCancel>
               
               <AlertDialogAction onClick={async()=>{await deleteProfile(elem) }}  className='bg-purple-800 hover:bg-purple-900 transition'>Continue</AlertDialogAction>
               
             
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
      

    </div>
  )
}

export default Delete