import { NextRequest, NextResponse } from 'next/server';

type Level = 0 | 1 | 2 | 3 | 4;

type Contribution = {
  date: string;
  count: number;
  level: Level;
};

type ContributionsResponse = {
  total: number;
  contributions: Array<Contribution>;
};

async function fetchGitHubContributions(
  username: string
): Promise<ContributionsResponse> {
  const url = `https://github.com/users/${username}/contributions`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'text/html',
    },
    cache: 'force-cache',
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status}`);
  }

  const html = await response.text();

  const dayElements = html.match(/<(?:rect|td)\b[^>]*>/g) ?? [];
  const contributions: Array<Contribution> = [];

  for (const element of dayElements) {
    const dateMatch = element.match(/\bdata-date="(\d{4}-\d{2}-\d{2})"/);
    const levelMatch = element.match(/\bdata-level="([0-4])"/);

    if (!dateMatch || !levelMatch) {
      continue;
    }

    const level = Number.parseInt(levelMatch[1], 10) as Level;

    contributions.push({
      date: dateMatch[1],
      count: 0,
      level,
    });
  }

  contributions.sort(
    (a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return {
    total: contributions.length,
    contributions,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Missing username parameter' },
      { status: 400 }
    );
  }

  try {
    const data = await fetchGitHubContributions(username);
    
    // Filter to last 12 months from today
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const filteredContributions = data.contributions.filter(
      (c) => new Date(c.date) >= oneYearAgo
    );
    
    return NextResponse.json({
      total: filteredContributions.length,
      contributions: filteredContributions,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to fetch contributions: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      },
      { status: 500 }
    );
  }
}
