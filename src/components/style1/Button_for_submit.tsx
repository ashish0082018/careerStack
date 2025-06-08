"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'

function Buttonfor_form() {
    const {pending}=useFormStatus()
  return (
    <div>

<button disabled={pending}
                type="submit"
                className="bg-purple-700 mt-4 rounded-md px-2 py-1 text-zinc-200 hover:bg-purple-700 transition hover:shadow-xl"
              >
             
               {
                pending? "ADDING...":"ADD"
               }
              </button>
    </div>
  )
}

export default Buttonfor_form