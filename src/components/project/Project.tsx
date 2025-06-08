"use client"

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus } from 'lucide-react'

import { project } from '@/app/actions/project'
import Showproject from './Showproject'

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  githubUrl: string
  liveUrl: string
  image: string
  featured: boolean
}

export default function Projects({ initialProjects }: { initialProjects: Project[] }) {
  const session = useSession()
  const user = session.data?.user
  const router = useRouter()

  const [isAddingProject, setIsAddingProject] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [] as string[],
    category: '',
    githubUrl: '',
    liveUrl: '',
    image: '',
    featured: false,
  })

  const categories = ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'AI/ML']

  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files ? e.target.files[0] : null
    if (uploadedFile) {
      setImage(uploadedFile)
      const previewUrl = URL.createObjectURL(uploadedFile)
      setImagePreview(previewUrl)
    }
  }

  const [load,setload]=useState(false);

  const handleSave = async () => {
    if (!image) {
      toast("Upload image")
      return
    }

    const formData = new FormData()
    formData.append("title", newProject.title)
    formData.append("description", newProject.description)
    formData.append("technologies", newProject.technologies.join(","))
    formData.append("category", newProject.category)
    formData.append("liveUrl", newProject.liveUrl)
    formData.append("githubUrl", newProject.githubUrl)
    formData.append("image", image)
setload(true)
    const result = await project(null, formData)

    if (result?.success) {
      toast.success("Project added!")
      setIsAddingProject(false) // ✅ Close dialog
      router.refresh() // ✅ Refresh the page to fetch latest projects
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        category: '',
        githubUrl: '',
        liveUrl: '',
        image: '',
        featured: false,
      })
      setImage(null)
      setImagePreview("")
      setload(false)
    } else if (result?.error) {
      toast.error(result.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Showcase</h1>
          <p className="text-muted-foreground mt-1">Manage and showcase your development projects</p>
        </div>

{
  load ? (
    <Dialog open={isAddingProject}>
      <DialogContent className="sm:max-w-[600px] flex items-center justify-center min-h-[300px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Adding your project...</p>
        </div>
      </DialogContent>
    </Dialog>
  ):    
    <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>Add a new project to your portfolio</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="My Awesome Project"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newProject.category}
                    onValueChange={(value) => setNewProject(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your project..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="live">Live URL (Optional)</Label>
                  <Input
                    id="live"
                    value={newProject.liveUrl}
                    onChange={(e) => setNewProject(prev => ({ ...prev, liveUrl: e.target.value }))}
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="image">Project Image</Label>
                <Input id="image" type="file" accept="image/*" onChange={uploadHandler} />
                {imagePreview && (
                  <div className="mt-2 w-24 h-24 border rounded-md overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  placeholder="React, TypeScript, Node.js"
                  onChange={(e) =>
                    setNewProject(prev => ({
                      ...prev,
                      technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean),
                    }))
                  }
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingProject(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Add Project</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
}
      </div>

      <Showproject project={initialProjects} />
    </div>
  )
}
