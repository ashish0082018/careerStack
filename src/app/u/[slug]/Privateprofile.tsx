'use client';

import { Lock, Smile, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function PrivateProfile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted/80 px-4">
      <Card className="w-full max-w-2xl shadow-xl border-none bg-card/80 backdrop-blur-md rounded-2xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center items-center space-x-4">
            <div className="bg-destructive/10 p-4 rounded-full">
              <Lock className="h-10 w-10 text-destructive" />
            </div>
            <Smile className="h-10 w-10 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Oops! This Profile is Private
          </h1>
          <p className="text-muted-foreground text-lg">
            The owner of this portfolio has chosen to keep their work under wraps for now. 
            <br />
            Don't worry though - there's plenty more to explore!
          </p>
          <div className="flex space-x-4 justify-center">
            <Link href="/" className="flex-1">
              <Button variant="default" className="w-full gap-2">
                <Home className="h-4 w-4" />
                Go Back Home
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground pt-4">
            Want to share your work with the world? 
            <Link href="/signup" className="text-primary ml-1 hover:underline">
              Create your own portfolio!
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}