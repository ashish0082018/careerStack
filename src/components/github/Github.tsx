"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Activity, Badge, BookOpen, Code, ExternalLink, RefreshCw, Star, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { handleDisconnect } from '../../app/actions/github'
import { toast } from 'react-toastify'
import { Refresh } from './ConnectButton'

// type Props = {}

function GithubPage({githubStats}:any) {
    console.log("from github",githubStats)
  const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast("Stats updated! Your GitHub data has been refreshed.");
    }, 2000);
  };
  return (

    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">GitHub Integration</h1>
            <p className="text-muted-foreground mt-1">
              Your GitHub activity and repository statistics
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : <Refresh/> }
            </Button>
            <Button variant="ghost" className='hover:bg-red-400' onClick={handleDisconnect}>
              Disconnect
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Stars', value: githubStats.totalStars, icon: <Star className="h-5 w-5 text-amber-600" />, bg: 'bg-amber-100' },
            { label: 'Repositories', value: githubStats.totalRepos, icon: <BookOpen className="h-5 w-5 text-blue-600" />, bg: 'bg-blue-100' },
            { label: 'Total Commits', value: githubStats.totalContributions, icon: <Code className="h-5 w-5 text-green-600" />, bg: 'bg-green-100' },
            { label: 'Followers', value: githubStats.followers, icon: <Users className="h-5 w-5 text-purple-600" />, bg: 'bg-purple-100' },
          ].map((item, i) => (
            <Card key={i}>
             <CardContent className="p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                  <div className={`${item.bg} p-2 rounded-lg`}>{item.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Languages & Contributions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Languages */}
          <Card className='shadow-xl'>
            <CardHeader>
              <CardTitle>Top Languages</CardTitle>
              <CardDescription>Programming languages you use most</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {githubStats.topLanguages.map((lang: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{lang.lang}</span>
                    <span className="text-sm text-muted-foreground">{lang.percent}%</span>
                  </div>
 <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      {/* Inner Filled Bar */}
      <div
        className="h-2 bg-yellow-600 rounded-full transition-all duration-500"
        style={{ width: `${lang.percent}%` }}
      />
    </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contribution Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Contribution Activity</CardTitle>
              <CardDescription>Your recent GitHub activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Current Streak</p>
                    <p className="text-sm text-muted-foreground">
                      {githubStats.streakDays} days
                    </p>
                  </div>
                </div>
                <Badge fontVariant="secondary">{githubStats.streakDays > 0 ? 'Active' : 'Inactive'}</Badge>
              </div>

              <div className="space-y-3">
                {githubStats.recentActivity.map((activity: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-muted p-1 rounded">
                      <Code className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.repoName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(activity.date).toDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pinned Repos */}
        <Card>
          <CardHeader>
            <CardTitle>Pinned Repositories</CardTitle>
            <CardDescription>Your most important repositories to showcase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {githubStats.pinnedRepos.map((repo: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-sm">{repo.name}</h3>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {repo.readmeLine || 'No description'}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                         <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>  {repo.topLanguage}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{repo.stars}</span>
                      </div>
                    </div>
                    <span>
                      Updated {new Date(repo.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  
  )
}

export default GithubPage