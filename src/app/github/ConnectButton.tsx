"use client"
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import React from 'react'
import { handleDisconnect } from '../../actions/github'

type Props = {}
      const handleConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI!; //This is  /api/github
    const scope = 'scope=read:user public_repo';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubAuthUrl;
  };

export const ConnectButton=({}: Props)=> {

  return (
 <Button onClick={handleConnect} className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Connect GitHub Account
              </Button>
  )
}


export const Refresh=()=>{
    return (
     <button  onClick={handleConnect} className="w-full">
                
                Refresh
              </button>
  )
}