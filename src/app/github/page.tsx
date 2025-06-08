
import { Card, CardContent } from '@/components/ui/card';
import { Github } from 'lucide-react';
import { ConnectButton } from './ConnectButton';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import GithubPage from './Github';


 export default async function GitHubPage() {
    const session=await auth()
const details=await prisma.gitHubProfile.findUnique({
    where:{userId:session?.user?.id}
})



  if (!details || !details.connect) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Connect Your GitHub</h2>
              <p className="text-muted-foreground mb-6">
                Connect your GitHub account to display your repositories, stars, and contribution activity
              </p>
             <ConnectButton/>
              <p className="text-xs text-muted-foreground mt-4">
                We'll only access public repository information
              </p>
            </CardContent>
          </Card>
        </div>
    );
  }


  return (
     <>
  
   <GithubPage githubStats={details} />
   
     </>
  );
}
