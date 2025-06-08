import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import React from 'react'
import Projects from './Project'
async function page() {
    const session = await auth()
    const projects = await prisma.project.findMany({
        where: {
            userId: session?.user?.id
        },
        select: {
            id: true,
            title: true,
            description: true,
            technologies: true,
            category: true,
            githubUrl: true,
            liveUrl: true,
            image: true,
            featured: true,
         
        }
    })
  
    

    return <Projects initialProjects={projects} />
}

export default page