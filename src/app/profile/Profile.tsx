"use client"
import { useActionState, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Upload, 
  Sparkles, 
  Link as LinkIcon,
  Github,
  Linkedin,
  Globe,
  Twitter,
  Plus,
  X,
  Eye
} from 'lucide-react';
import { toast } from 'react-toastify';
import { saveProfile } from '../actions/profile';
import axios from 'axios';


type Props = {}

function Profile({ initialProfile }: { initialProfile: any }) {
  const dummyProfile = {
    name: 'John Developer',
    jobTitle: 'Full Stack Developer',
    location: 'San Francisco, CA',
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. I love working with React, Node.js, and cloud technologies.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    socialLinks: {
      github: 'https://github.com/johndeveloper',
      linkedin: 'https://linkedin.com/in/johndeveloper',
      twitter: 'https://twitter.com/johndeveloper',
      website: 'https://johndeveloper.dev',
    },
  };
 const [profile, setProfile] = useState(initialProfile ?? dummyProfile);


  const [newSkill, setNewSkill] = useState('');

const [formState, action, pending] = useActionState(saveProfile,{ error: null });

useEffect(() => {
  if (formState?.success) {
    toast.success("Profile saved!");
  } else if (formState?.error) {
    toast.error(formState.error);
  }
}, [formState]);


// IMAGE UPLOAD
  const [imagePreview, setImagePreview] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files ? e.target.files[0] : null;
    if (uploadedFile) {
      setImage(uploadedFile);
      const previewUrl = URL.createObjectURL(uploadedFile);
      setImagePreview(previewUrl);
    }
  };


  const handleSave = async () => {
  try {
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('jobTitle', profile.jobTitle);
    formData.append('location', profile.location);
    formData.append('bio', profile.bio);
    formData.append('skills', JSON.stringify(profile.skills));
    formData.append('socialLinks', JSON.stringify(profile.socialLinks));
     
    if (image) {
      formData.append('imageUrl', image);
    }

    if(!image && !initialProfile){
        
      toast("Upload image")
      return 
    }
    if(!profile.name || !profile.jobTitle){
      toast("Fill all the fields")
      return 
    }

    // Create a proper object with non-null values
    const payload = {
      name: profile.name,
      jobTitle: profile.jobTitle,
      location: profile.location,
      bio: profile.bio,
      skills: profile.skills,
      socialLinks: profile.socialLinks,
      imageUrl: image || null
    };

    await action(payload);
  } catch (error) {
    console.error("Error in handleSave:", error);
    toast.error("Failed to prepare profile data");
  }
};
  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };


    const [aiload,setaiload]=useState(false)

  const handleMagic=async(prompt:string)=>{
    setaiload(true);
    const response=await axios.post("/api/askai",{prompt});
    setaiload(false);
     toast("Your bio has been enhanced with AI suggestions.");
         setProfile(prev => ({ ...prev, bio: response.data }));

  }

  return (
         <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile Builder</h1>
            <p className="text-muted-foreground mt-1">
              Create a compelling professional profile
            </p>
          </div>
          <div className="flex items-center space-x-2">
{initialProfile ? (
  <Button variant="outline" asChild>
    <a href={`/u/${initialProfile.customUrl}`} target="_blank" rel="noopener noreferrer">
      <Eye className="mr-2 h-4 w-4" />
      Preview
    </a>
  </Button>
) : (
  <Button variant="outline" disabled>
    <Eye className="mr-2 h-4 w-4" />
    Preview
  </Button>
)}
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">

            <div className="flex gap-5 items-center">
                {imagePreview ? (
                  <div
                    className="w-20 h-20 rounded-full overflow-hidden flex justify-center items-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${imagePreview})` }}
                  ></div>
                ) : (
                   <Avatar className="h-20 w-20">
                    <AvatarImage src={initialProfile?.imageUrl || ""} alt={profile.name} />
                    <AvatarFallback className="text-lg">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                <input
                  onChange={uploadHandler}
                  type="file"
                  className="hidden"
                  id="file-upload"
                  name="image"
                />
                <div className="flex flex-col gap-2 ml-4"> 
 <label  htmlFor="file-upload" className='flex items-center border rounded-lg p-2 hover:shadow-xl dark:hover:shadow-zinc-800 hover:cursor-pointer '> 
                 
                    <Upload className="mr-2 h-4 w-4" />
                  Upload Photo 
                  
                </label>
                <p className="text-xs text-red-600 ">Upload image of size less than 1Mb</p>
                </div>
              </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                    required
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={profile.jobTitle}
                      onChange={(e) => setProfile(prev => ({ ...prev, jobTitle: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                     required
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bio Section */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Bio</CardTitle>
                <CardDescription>
                  Write a compelling summary of your experience and skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bio">Bio</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={()=>handleMagic(profile.bio)}
                      disabled={aiload}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {aiload ? "Optimizing..." : "AI Optimize"}
                    </Button>
                  </div>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    placeholder="Tell your professional story..."
                   maxLength={500}
                  />
                  <p className="text-sm text-muted-foreground">
                    {profile.bio.length}/500 characters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
                <CardDescription>
                  Add your technical skills and expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LinkIcon className="mr-2 h-5 w-5" />
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      value={profile.socialLinks.github}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, github: e.target.value }
                      }))}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      value={profile.socialLinks.linkedin}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                      }))}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center">
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      value={profile.socialLinks.twitter}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                      }))}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={profile.socialLinks.website}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, website: e.target.value }
                      }))}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Preview</CardTitle>
                <CardDescription>
                  How your profile appears to visitors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                   {imagePreview ? (
                  <div
                    className="w-20 h-20 h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden flex justify-center items-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${imagePreview})` }}
                  ></div>
                ) : (
<Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={initialProfile?.imageUrl || ""} alt={profile.name} />
                    <AvatarFallback className="text-xl">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                  
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                  <p className="text-muted-foreground">{profile.jobTitle}</p>
                  <p className="text-sm text-muted-foreground">{profile.location}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-sm text-muted-foreground">{profile.bio}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills.slice(0, 6).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{profile.skills.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Links</h4>
                  <div className="space-y-2">
                    {/* {Object.entries(profile.socialLinks).map(([platform, url]) => (
                      url && (
                        <div key={platform} className="flex items-center text-sm">
                          {platform === 'github' && <Github className="mr-2 h-4 w-4" />}
                          {platform === 'linkedin' && <Linkedin className="mr-2 h-4 w-4" />}
                          {platform === 'twitter' && <Twitter className="mr-2 h-4 w-4" />}
                          {platform === 'website' && <Globe className="mr-2 h-4 w-4" />}
                          <span className="capitalize">{platform}</span>
                        </div>
                      )
                    ))} */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}

export default Profile