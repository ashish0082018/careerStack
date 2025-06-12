
import { useActionState, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signup } from '@/app/actions/signup';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function SignUp() {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


   const [formdata, setFormdata] = useState({
      name: "",
      email: "",
      password: "",
    });
     type SignupError = {
       name?: string[];
       email?: string[];
       password?: string[];
       success?: string;
       formError?: string;
     };
  
     const [formState, action, pending] = useActionState<{ error: SignupError }>(signup, { error: {} });
    const router=useRouter()
      
    
    
      if (formState.error.success==="/verifyotp") {
       
    router.push("/verifyotp")
    
      }
  const handleSubmit = async (formData: FormData) => {
    if(formdata.password !== confirmPassword) {
       return toast.error("Write same password in both fields");
    }
    action(formData);
  
  };
  const handleGoogleSignUp = async () => {
   
    await signIn("google", { callbackUrl: "/dashboard" });
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
           
  <Image
    src="/cs-logo.jpg"
    alt="CareerStack Logo"
    width={40}
    height={40}
    priority
  />

          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Start building your developer brand today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleSignUp}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label >Full Name</Label>
              <Input
                
                type="text"
              value={formdata.name}
              onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
               name="name"
               required
              />
                {formState.error.name && (
              <span className="text-red-500">
                {formState.error.name.map((elem, key) => (
                  <li key={key}>{elem}</li>
                ))}
              </span>
            )}
            </div>

            <div className="space-y-2">
              <Label >Email</Label>
              <Input
                
                type="email"
               value={formdata.email}
                onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
               name="email"
                required
              />
                 {formState.error.email && (
              <span className="text-red-500">
                {formState.error.email.map((elem, key) => (
                  <li key={key}>{elem}</li>
                ))}
              </span>
            )}
            </div>
            
            <div className="space-y-2">
              <Label >Password</Label>
              <div className="relative">
                <Input
                 
                  type={showPassword ? "text" : "password"}
                  value={formdata.password}
                onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                name="password"
                  required
                  placeholder="At least 8 characters"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                            {formState.error.password && (
              <span className="text-red-500">
                {formState.error.password.map((elem, key) => (
                  <li key={key}>{elem}</li>
                ))}
              </span>
            )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
            </div>


          {formState.error.formError && (
            <div className="text-red-600 mt-4 bg-red-400 border-red-800 border-1 rounded-lg px-2 py-1">
              {formState.error.formError}
            </div>
          )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href={"/signin"} className="text-indigo-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
