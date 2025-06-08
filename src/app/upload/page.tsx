'use client'

import React, { useState } from 'react'
import { uploadResume } from '../actions/resumeupload'

export default function ResumeUploadForm() {
  const [pdfUrl, setPdfUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpload = async (formData: FormData) => {
    setLoading(true)
    setMessage('')
    const res = await uploadResume(formData)
    setLoading(false)

    if (res.success) {
      setPdfUrl(res.url || '')
      setMessage('Resume uploaded successfully!')
    } else {
      setMessage(res.message || 'Upload failed.')
    }
  }

  return (
    <form action={handleUpload} className="p-4 border rounded-lg space-y-4 w-full max-w-md mx-auto">
      <label className="block font-medium">Upload Resume (PDF only)</label>
      <input
        type="file"
        name="resume"
        accept=".pdf"
        required
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Uploading...' : 'Upload Resume'}
      </button>

      {message && <p className="mt-2 text-sm text-center">{message}</p>}

      {pdfUrl && (
        <p className="mt-4 text-center">
          ✅ <a href={pdfUrl} className="text-blue-600 underline" target="_blank">View Resume</a>
        </p>
      )}
    </form>
  )
}
