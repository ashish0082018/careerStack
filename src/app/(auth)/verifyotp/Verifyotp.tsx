'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Mail, CheckCircle } from 'lucide-react'
import { verifyOtp } from '@/app/actions/verifycode'

export default function EmailVerification() {
  const [formData, action, pending] = useActionState(verifyOtp, {
    success: false,
    message: '',
  })

  if (formData?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Email verified!</CardTitle>
            <CardDescription>Your email has been successfully verified</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/signin">Continue to login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>We've sent a verification link and OTP to your email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Enter the 6-digit OTP sent to your email if you didn’t receive the link.
          </p>

          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
              />
              {formData?.message && (
                <p className="text-sm text-red-500">{formData.message}</p>
              )}
              <Button className="w-full" type="submit" disabled={pending}>
                {pending ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </div>
          </form>

          <Button variant="ghost" className="w-full" asChild>
            <Link href="/signin">Back to login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
