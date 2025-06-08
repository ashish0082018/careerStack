    // app/api/github/user/route.ts
import { NextResponse } from 'next/server';
import { getGitHubUserData } from '@/lib/githubDataStore';

export async function GET() {
  const data = getGitHubUserData();
  console.log(data);
  
  if (!data) return NextResponse.json({ error: 'No data' }, { status: 404 });
  return NextResponse.json(data);
}
