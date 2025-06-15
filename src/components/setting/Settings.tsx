
"use client"
import { useActionState, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useTheme } from 'next-themes';

import { 
  User,  
  Palette, 
  Globe, 
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { setCustomurl, setEmail, setLocation, setPrivate } from '@/app/actions/setting';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Settings({setting}:any) {
  const session= useSession();
  const user=session.data?.user
  const [settings, setSettings] = useState(setting);
  const { theme, setTheme } = useTheme();
  const [customUrl, setCustomUrl] = useState(settings.customDomain);
  


const [formState,action,pending]=useActionState(setCustomurl,{error:{},success:null})

const handleCustomDomainSubmit = async (formData: FormData) => {
await action(formData);
};

  return (

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input disabled={true} id="firstName" defaultValue= {user?.name?.split(" ")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input disabled={true} id="lastName" defaultValue= {user?.name?.split(" ")[1]} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input disabled={true} id="email" type="email" defaultValue={user?.email || ""} />
                </div>

                            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Custom Domain
                </CardTitle>
                <CardDescription>
                  Use your own domain for your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form action={handleCustomDomainSubmit} className="flex items-center">
                    <Input disabled={!settings.isexists}
                    value={customUrl}
                     name='customDomain'
                      className="rounded-l-none" 
                      onChange={(e) => setCustomUrl(e.target.value)}
                    />
                    <Button disabled={pending || !settings.isexists} type="submit" variant={"outline"} className="p-3 hover:bg-green-400 mx-2"> {pending? "checking":"Save"} </Button>
                </form> 
                {formState?.success ? ( <span className="text-green-500 text-sm">
                  {formState.error.message}</span>) :(<span className="text-red-500 text-sm">
                  {formState?.error.message}</span>) }
              </CardContent>
              
            </Card>
              </CardContent>
            </Card>

            {/* Security Settings */}

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Visibility</CardTitle>
                <CardDescription>
                  Control who can see your profile and information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your profile visible to everyone
                    </p>
                  </div>
                  <Switch disabled={!settings.isexists}
                    checked={settings.privacy.profilePublic}
                    onCheckedChange={async(checked) => {
                        try {
                            await setPrivate(checked);
                            toast.success("Profile visibility updated successfully");
                             setSettings(prev => ({ ...prev, privacy: { ...prev.privacy, profilePublic: checked }}))
                        } catch (error) {
                            
                        }
                        
                    }
                        
                     
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Show Email Address</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your email on your public profile
                    </p>
                  </div>
                  <Switch disabled={!settings.isexists}
                    checked={settings.privacy.showEmail}
                    onCheckedChange={async(checked) => {
                 try {
                    await setEmail(checked);
                    toast.success("Email visibility updated successfully");
     setSettings(prev => ({...prev, privacy: { ...prev.privacy, showEmail: checked }}))
              } catch (error) {
    
                    console.error("Error updating email visibility:", error);}
                    }
                }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Show Location</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your location on your profile
                    </p>
                  </div> 
                  <Switch disabled={!settings.isexists}
                    checked={settings.privacy.showLocation}
                    onCheckedChange={async(checked) => {
                      try {
                        await setLocation(checked);
                        toast.success("Location visibility updated successfully");
                         setSettings(prev => ({...prev,privacy: { ...prev.privacy, showLocation: checked }}))
                     } catch (error) {
                        console.log("Error updating location visibility:", error);
                        
                     }}
                    }
                  />
                </div>
                

              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Appearance
                  {/* {user?.plan === 'free' && (
                    <Badge variant="secondary" className="ml-2">
                      <Star className="mr-1 h-3 w-3" />
                      Pro
                    </Badge>
                  )} */}
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use dark theme for better low-light viewing
                    </p>
                  </div>
                    <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>
            
              </CardContent>
            </Card>

     
            {/* Danger Zone */}
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center text-destructive">
                  <Trash2 className="mr-2 h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-destructive rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">Delete Account</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
{settings.isexists
&&                 <Link href={`/u/${customUrl}`} target='_blank'> <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="mr-2 h-4 w-4" />
                 View Public Profile
                </Button></Link>}
                <Link href={"/profile"}><Button variant="outline" className="w-full justify-start">
                 Profile
                </Button></Link>           
              </CardContent>
            </Card>
        </div>


       
      </div>

  );
}
