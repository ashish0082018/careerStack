'use server'

import { v2 as cloudinary } from 'cloudinary'
import { writeFile } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function uploadResume(formData: FormData) {
  const file = formData.get('resume') as File
  if (!file || file.type !== 'application/pdf') {
    return { success: false, message: 'Please upload a valid PDF file.' }
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const tempFilePath = path.join('/tmp', `${randomUUID()}.pdf`)

  await writeFile(tempFilePath, buffer)

  const result = await cloudinary.uploader.upload(tempFilePath, {
    resource_type: 'raw',
    folder: 'resumes',
    public_id: file.name.split('.pdf')[0],
  })

  return { success: true, url: result.secure_url }
}
