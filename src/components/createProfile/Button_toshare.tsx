"use client"
import React, { useState } from 'react'

const Button_toshare = ({slug}:{slug:string}) => {
    const linkToCopy=`http://localhost:3000/profile/${slug}`
    const [isCopied, setIsCopied] = useState(false);

    // The link you want to copy

  
    // Function to handle the copy action
    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(linkToCopy);
        setIsCopied(true); // Update state to show "Copied!" message
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    };
  return (
   <>
  <button onClick={handleCopyLink} className='rounded-xl text-white bg-purple-600 px-3 py-2 hover:bg-purple-700 transition'>
    {isCopied? 'Copied':'Share Profile'}
  </button>
   
   </>
  )
}

export default Button_toshare