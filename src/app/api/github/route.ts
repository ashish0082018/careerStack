import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

  // Step 1: Get GitHub Access Token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GITHUB_REDIRECT_URI,
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  if (!accessToken) return NextResponse.json({ error: 'Token fetch failed' }, { status: 400 });

  // Step 2: GitHub GraphQL Query
  const query = `
    query {
      viewer {
        login
        name
        followers { totalCount }
        repositories(privacy: PUBLIC, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            name
            stargazerCount
            primaryLanguage { name }
            updatedAt
            url
          }
        }
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              url
              stargazerCount
              updatedAt
              primaryLanguage { name }
              object(expression: "HEAD:README.md") {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
          commitContributionsByRepository(maxRepositories: 4) {
            contributions(orderBy: {field: OCCURRED_AT, direction: DESC}, first: 4) {
              nodes {
                occurredAt
                commitCount
                repository {
                  name
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const gqlRes = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const { data } = await gqlRes.json();
  const viewer = data.viewer;

  // Aggregate stars and languages
  const repos = viewer.repositories.nodes;
  const totalStars = repos.reduce((sum: number, r: any) => sum + r.stargazerCount, 0);
  const langCount: { [key: string]: number } = {};
  for (let repo of repos) {
    const lang = repo.primaryLanguage?.name;
    if (lang) langCount[lang] = (langCount[lang] || 0) + 1;
  }

  // Top Languages % Calculation
  const totalLangs = Object.values(langCount).reduce((a, b) => a + b, 0);
  let topLanguages = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([lang, count]) => ({ lang, percent: +(count / totalLangs * 100).toFixed(2) }));

  const topLangTotalPercent = topLanguages.reduce((sum, l) => sum + l.percent, 0);
  if (topLangTotalPercent < 100) {
    topLanguages.push({ lang: 'Other', percent: +(100 - topLangTotalPercent).toFixed(2) });
  }

  // Streak Calculation
  const contributionDays = viewer.contributionsCollection.contributionCalendar.weeks
    .flatMap((week: any) => week.contributionDays)
    .map((day: any) => ({
      date: new Date(day.date),
      count: day.contributionCount,
    }))
    .sort(({a, b}:any) => b.date.getTime() - a.date.getTime());

  let streakDays = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const day of contributionDays) {
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);
    if (dayDate.getTime() === cursor.getTime() && day.count > 0) {
      streakDays++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (dayDate.getTime() < cursor.getTime()) {
      cursor.setDate(cursor.getDate() - 1);
      if (dayDate.getTime() === cursor.getTime() && day.count > 0) {
        streakDays++;
        cursor.setDate(cursor.getDate() - 1);
      } else break;
    } else {
      break;
    }
  }

  // Pinned Repos
  const pinnedRepos = viewer.pinnedItems.nodes.map((repo: any) => ({
    name: repo.name,
    url: repo.url,
    stars: repo.stargazerCount,
    updatedAt: repo.updatedAt,
    topLanguage: repo.primaryLanguage?.name,
    readmeLine: repo.object?.text?.split('\n')[0] || 'No README found',
  }));

  // Recent Activity (4 latest commits across all repos)
  const recentActivity = viewer.contributionsCollection.commitContributionsByRepository
    .flatMap((repo: any) => repo.contributions.nodes)
    .sort((a: any, b: any) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
    .slice(0, 4)
    .map((a: any) => ({
      date: a.occurredAt,
      repoName: a.repository.name,
      repoUrl: a.repository.url,
    }));

  // Save to DB
  const session = await auth();
  const details = await prisma.gitHubProfile.upsert({
    where: {
      userId: session?.user?.id,
    },
    update: {
      login: viewer.login,
      name: viewer.name,
      followers: viewer.followers.totalCount,
      totalRepos: viewer.repositories.totalCount,
      totalStars,
      totalContributions: viewer.contributionsCollection.contributionCalendar.totalContributions,
      topLanguages,
      streakDays,
      pinnedRepos,
      recentActivity,
      connect: true,
    },
    create: {
      userId: session?.user?.id as string,
      login: viewer.login,
      name: viewer.name,
      followers: viewer.followers.totalCount,
      totalRepos: viewer.repositories.totalCount,
      totalStars,
      totalContributions: viewer.contributionsCollection.contributionCalendar.totalContributions,
      topLanguages,
      streakDays,
      pinnedRepos,
      recentActivity,
      connect: true,
    },
  });

  return NextResponse.redirect(new URL('/github', req.url));
}
