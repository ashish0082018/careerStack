
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';


import { 
  User, 
  FolderOpen, 
  Github, 
  FileText, 
  BarChart3, 
  Eye,
  Star,
  TrendingUp,
  Calendar,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Dashboard({detail}:any) {
const session=useSession();
console.log(detail);

  const stats = [
    {
      title: 'Profile Views',
      value: detail?.profileViews || '-',
    //   change: '+12%',
      icon: Eye,
    //   trend: 'up'
    },
    {
      title: 'GitHub Stars',
      value: detail?.totalStars || '-',
    //   change: '+5',
      icon: Star,
    //   trend: 'up'
    },
    {
      title: 'Projects',
      value: detail?.projects || '-',
    //   change: '+2',
      icon: FolderOpen,
    //   trend: 'up'
    },
    // {
    //   title: 'Resume Downloads',
    //   value: '45',
    //   change: '+8',
    //   icon: FileText,
    //   trend: 'up'
    // }
  ];


  const quickActions = [
    {
      title: 'Update Profile',
      description: 'Keep your profile fresh and engaging',
      href: '/profile',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      title: 'Add Project',
      description: 'Showcase your latest work',
      href: '/project',
      icon: FolderOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Sync GitHub',
      description: 'Update your GitHub stats',
      href: '/github',
      icon: Github,
      color: 'bg-purple-500'
    },
    {
      title: 'Optimize Resume',
      description: 'AI-powered resume improvements',
      href: '/resume',
      icon: FileText,
      color: 'bg-orange-500'
    }
  ];

  return (
   
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {session.data?.user?.name} </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Here's what's happening with your developer brand
            </p>
          </div>
          <div className="flex items-center space-x-2">
            

          </div>
        </div>

        {/* Profile Completion */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Profile Completion
            </CardTitle>
            <CardDescription className="text-sm">
              Complete your profile to increase visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">{detail.arr.length/4*100}% Complete</span>
              <span className="text-sm text-muted-foreground">{1} of 4 sections</span>
            </div>  
            <Progress value={detail.arr.length/4*100} className="h-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
              <div className={`flex items-center ${detail.arr.includes("profile") ? "text-green-600" : "text-muted-foreground"}`}>
                  {detail.arr.includes("profile") ?   <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0" />:  <div className="mr-2 h-4 w-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />}
                <span>Basic Information</span>
              </div>
              <div  className={`flex items-center ${detail.arr.includes("profile") ? "text-green-600" : "text-muted-foreground"}`}>
                  {detail.arr.includes("profile") ?   <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0" />:  <div className="mr-2 h-4 w-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />}
                <span>Skills & Experience </span>
              </div>
              <div className={`flex items-center ${detail.arr.includes("projects") ? "text-green-600" : "text-muted-foreground"}`}>
                 {detail.arr.includes("projects") ?   <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0" />:  <div className="mr-2 h-4 w-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />}
                <span>Projects Portfolio</span>
              </div>
              <div  className={`flex items-center ${detail.arr.includes("github") ? "text-green-600" : "text-muted-foreground"}`}>
               
                {detail.arr.includes("github") ?   <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0" />:  <div className="mr-2 h-4 w-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />}
                <span>GitHub Integration</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                      {stat.title}
                    </p>
                    <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="bg-muted p-2 rounded-lg flex-shrink-0 hover:scale">
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
                {/* <div className="flex items-center mt-4 text-xs sm:text-sm">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1 flex-shrink-0" />
                  <span className="text-green-600">{stat.change}</span>
                  <span className="text-muted-foreground ml-1 hidden sm:inline">from last month</span>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
              <CardDescription className="text-sm">
                Common tasks to improve your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 sm:p-4"
                  asChild
                >
                  <Link href={action.href}>
                    <div className={`p-2 rounded-lg mr-3 flex-shrink-0 ${action.color}`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base">{action.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}

        </div>
      </div>
   
  );
}
