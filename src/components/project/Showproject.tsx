"use client"
import { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  ExternalLink, 
  Github, 
  Star, 

  Filter,
  Search,

  Edit,
  Trash2,
  FolderOpen,
  GripVertical,
 
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { deleteProject, updateFeatured } from '@/app/actions/project';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  image: string;
  featured: boolean;
}

type Props = {
  project: Project[];
};

function Showproject({ project }: Props) {
    const session=useSession()
      const user=session.data?.user
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('all');
      const [isAddingProject, setIsAddingProject] = useState(false);
     const [projects, setProjects] = useState<Project[]>( project||[]);
    
       useEffect(() => {
        setProjects(project || []);
      }, [project]);
    
      const categories = ['all', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'AI/ML'];
    
      const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
    
    

    
    
  return (
    <div>
                {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
 {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                {project.image ? (
                  <Image
           src={project.image}
          alt={project.title}
           width={500} // change to actual width
          height={192} // 48 * 4 = 192px height
          className="w-full h-48 object-cover rounded-t-lg"
/>
                ) : (
                  <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                    <Github className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </div>
                {project.featured && (
                  <Badge className="absolute top-2 left-2 bg-amber-500">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {project.category}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1 h-3 w-3" />
                        Code
                      </a>
                    </Button>
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Live
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex space-x-1">
<Button
  variant="ghost"
  size="sm"
  onClick={async () => {
    try {
      await updateFeatured(project.id);
      setProjects(prev =>
        prev.map(pro =>
          pro.id === project.id ? { ...pro, featured: !pro.featured } : pro
        )
      );
    } catch (error) {
      toast.error("Something went wrong while updating featured status.");
      console.error(error);
    }
  }}
  className={project.featured ? "text-amber-500" : ""}
>
  <Star className={`h-4 w-4 ${project.featured ? "fill-current" : ""}`} />
</Button>

                   


                    
<Dialog>
  <DialogTrigger asChild>
    <Button 
      variant="ghost" 
      size="sm"
      className="text-destructive hover:text-destructive"
    >                        
      <Trash2 className="h-4 w-4" />
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Delete</DialogTitle>
      <DialogDescription>
        Are you sure to delete your project?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button
        variant="destructive"
        onClick={async () => {
          try {
            await deleteProject(project.id);
            toast.success("Project deleted successfully.");
            // Optionally update local state
            setProjects((prev) => prev.filter((p) => p.id !== project.id));
          } catch (err) {
            toast.error("Something went wrong while deleting.");
            console.error(err);
          }
        }}
      >
        Yes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== 'all' 
                  ? "Try adjusting your search or filter criteria"
                  : "Start by adding your first project"}
              </p>
              {!searchTerm && selectedCategory === 'all' && (
                <Button onClick={() => setIsAddingProject(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Project
                </Button>
              )}
            </CardContent>
          </Card>
        )}

    </div>
  )
}

export default Showproject