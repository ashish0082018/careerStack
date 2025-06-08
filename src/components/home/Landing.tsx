

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/home/Header';
import { 
  Code, 
  Github, 
  BarChart3, 
  FileText, 
  User, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/home/Footer';

export default function Landing() {
  const features = [
    {
      icon: User,
      title: 'Profile Builder',
      description: 'Create a stunning developer profile with AI-powered bio optimization'
    },
    {
      icon: Code,
      title: 'Project Showcase',
      description: 'Display your best work with beautiful project cards and filtering'
    },
    {
      icon: Github,
      title: 'GitHub Integration',
      description: 'Sync your GitHub stats, repos, and contribution graphs automatically'
    },
    {
      icon: FileText,
      title: 'Resume Optimizer',
      description: 'AI-powered resume optimization and suggestions'
    },

    {
      icon: Sparkles,
      title: 'Personalized Portfolio',
      description: 'Create a custom portfolio that highlights your skills and projects'
     
    },
        {
      icon: BarChart3,
      title: 'Control Panel',
      description: 'Manage your profile, projects, github and resume from one dashboard'  
    }
  ];


 

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Build Your
              <span className="text-indigo-600"> Developer Brand</span>
              <br />
              That Gets You Hired
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create a stunning professional presence with AI-powered tools, 
              GitHub integration, and analytics that help you stand out to employers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href={"/signup"}>
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

            </div>
            <p className="text-sm text-muted-foreground mt-4">
             start building your developer brand today...
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From profile building to career planning, we've got you covered
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
 

      {/* Pricing Section */}
  

      {/* CTA Section */}


      {/* Footer */}
      {/* <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-bold text-xl">CareerStack</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link to="/pricing" className="hover:text-foreground">Pricing</Link>
              <Link to="#" className="hover:text-foreground">Documentation</Link>
              <Link to="#" className="hover:text-foreground">Support</Link>
              <Link to="#" className="hover:text-foreground">Privacy</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 CareerStack. All rights reserved.
          </div>
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
}
