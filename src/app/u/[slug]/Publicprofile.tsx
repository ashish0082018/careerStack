
"use client"
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Github,
  Linkedin,
  Globe,
  Twitter,
  MapPin,
  Calendar,
  Star,
  GitFork,
  ExternalLink,
  Mail
} from 'lucide-react';

export default function PublicProfile({profile}:any) {



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
<Avatar className="h-32 w-32">
  <AvatarImage src={profile.imageUrl || ""} alt={profile.name} />
  <AvatarFallback className="text-2xl">
    {profile.name.split(' ').map(n => n[0]).join('')}
  </AvatarFallback>
</Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-xl text-muted-foreground">{profile.jobTitle}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                 
                  {profile.privacy.showLocation &&  <>  <MapPin className="mr-1 h-4 w-4" />{ profile.location}  </> }
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Joined {profile.joinedDate}
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-xl font-bold">{profile.stats.repositories}</div>
                  <div className="text-sm text-muted-foreground">Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{profile.stats.githubStars}</div>
                  <div className="text-sm text-muted-foreground">GitHub Stars</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{profile.stats.followers}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <div className="flex space-x-2">
                {(profile.socialLinks && typeof profile.socialLinks === 'object') &&
                  Object.entries(profile.socialLinks).map(([platform, url]) =>
                    url ? (
                      <Button key={platform} variant="outline" size="icon" asChild>
                        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                        <a href={String(url)} target="_blank" rel="noopener noreferrer">
                          {platform === 'github' && <Github className="h-4 w-4" />}
                          {platform === 'linkedin' && <Linkedin className="h-4 w-4" />}
                          {platform === 'twitter' && <Twitter className="h-4 w-4" />}
                          {platform === 'website' && <Globe className="h-4 w-4" />}
                        </a>
                      </Button>
                    ) : null
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              </CardContent>
            </Card>

            {/* Featured Projects */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-6">Featured Projects</h2>
                <div className="space-y-6">
                  {profile.featuredProjects.map((project: {
                    id: string | number;
                    image?: string;
                    title: string;
                    stars: number;
                    forks: number;
                    description: string;
                    technologies: string[];
                    githubUrl: string;
                    liveUrl?: string;
                  }) => (
                    <div key={project.id} className="border rounded-lg p-6">
                      {project.image && (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4" />
                            {project.stars}
                          </div>
                          <div className="flex items-center">
                            <GitFork className="mr-1 h-4 w-4" />
                            {project.forks}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                        {project.liveUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* GitHub Activity */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">GitHub Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Stars</span>
                    <span className="font-semibold">{profile.stats.githubStars}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Public Repos</span>
                    <span className="font-semibold">{profile.stats.repositories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">This Week</span>
                    <span className="font-semibold">{profile.stats.totalContributions} commits</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button variant="outline" className="w-full" asChild>
                  <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View GitHub Profile
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Get In Touch</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Interested in collaborating or have a project in mind? Let's connect!
                </p>
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
