'use client'

import React, { useState } from 'react'
import { pdfToText } from 'pdf-ts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Button
} from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { FileText, Zap } from 'lucide-react'
import Result from './Result'

const jobDomains = [
  'Software Development',
  'Data Science',
  'Product Management',
  'UI/UX Design',
  'Cybersecurity',
  'Marketing',
  'DevOps',
  'Sales',
]

export default function ResumeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [rawText, setRawText] = useState<string | null>(null)
  const [analysisMode, setAnalysisMode] = useState<'domain' | 'description'>('domain')
  const [jobDomain, setJobDomain] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const cleanText = (text: string) => {
    return text.replace(/[^\x20-\x7E\n\r\t]+/g, '').trim()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.')
      return
    }

    setSelectedFile(file)
    setError('')
    setResult(null)
    setRawText(null)

    try {
      const buffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(buffer)
      const extractedText = await pdfToText(uint8Array)
      const cleaned = cleanText(extractedText)
      setRawText(cleaned)
    } catch (err) {
      console.error('PDF parsing failed:', err)
      setError('❌ Error extracting text from PDF.')
    }
  }

  const handleAnalyze = async () => {
    setError('')
    setResult(null)

    if (!rawText) {
      setError('Please upload a resume PDF first.')
      return
    }

    const finalDescription =
      analysisMode === 'domain' ? jobDomain : jobDescription.trim()

    if (!finalDescription) {
      setError('Please provide a job domain or description.')
      return
    }

    setIsAnalyzing(true)

    try {
      const res = await fetch('/api/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeRaw: rawText,
          jobDescription: finalDescription,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Something went wrong with analysis.')
      } else {
        const data = await res.json()
        setResult(data)
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Unexpected error during analysis.')
    }

    setIsAnalyzing(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
              <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            AI Resume Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant, AI-powered feedback on your resume. Upload your PDF and receive actionable insights to improve your resume and land more interviews.
          </p>
        </div>
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Upload & Analyze Your Resume
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label  className="text-sm font-medium">
              Upload Resume (PDF only)
            </Label>
            <div className="relative">
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="file:mr-4 file:py-2 py-[-1] file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
              />
              {selectedFile && (
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>{selectedFile.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Mode Selection */}
          <div className="space-y-4 " >
            <Label className="text-sm font-medium">Choose Analysis Method</Label>
            <div className="flex gap-1 lg:gap-4 overflow-hidden">
              <Button
                variant={analysisMode === 'domain' ? 'default' : 'outline'}
                onClick={() => setAnalysisMode('domain')}
                  className="flex-1 text-[13px] p-1 mr-5 lg:text-[14px] "
              >
                Select Job Domain
              </Button>
              <Button
                variant={analysisMode === 'description' ? 'default' : 'outline'}
                onClick={() => setAnalysisMode('description')}
                className="flex-1 text-[13px] p-1 mr-5 lg:text-[14px] "
              >
                Paste Job Description
              </Button>
            </div>
          </div>

          {/* Domain or Description Input */}
          {analysisMode === 'domain' ? (
            <div className="space-y-2">
              <Label htmlFor="job-domain" className="text-sm font-medium">
                Select Job Domain
              </Label>
              <Select value={jobDomain} onValueChange={setJobDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your target job domain" />
                </SelectTrigger>
                <SelectContent>
                  {jobDomains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="job-description" className="text-sm font-medium">
                Paste Job Description
              </Label>
              <Textarea
                id="job-description"
                placeholder="Paste the complete job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-6 text-lg font-semibold"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Analyze Resume
              </>
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 font-medium text-center">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Result Component */}
      {result && <div className="mt-8"><Result analysisResults={result} /></div>}
    </div>
  )
}
