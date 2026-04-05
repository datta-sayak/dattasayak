'use client';

import { useCallback, useEffect, useState } from 'react';

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

interface GitHubCalendarProps {
  username: string;
  errorMessage?: string;
}

const LEVEL_BG_CLASSES: Record<Level, string> = {
  0: 'bg-[#ebedf0] [.theme-dark_&]:bg-[#161b22]',
  1: 'bg-[#c6e48b] [.theme-dark_&]:bg-[#0e4429]',
  2: 'bg-[#7bc96f] [.theme-dark_&]:bg-[#006d32]',
  3: 'bg-[#239a3b] [.theme-dark_&]:bg-[#26a641]',
  4: 'bg-[#196127] [.theme-dark_&]:bg-[#39d353]',
};

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function GitHubCalendar({
  username,
  errorMessage = `Failed to load contributions for ${username}`,
}: GitHubCalendarProps) {
  const [data, setData] = useState<ContributionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/contributions?username=${username}`);

      if (!response.ok) {
        throw new Error(errorMessage);
      }

      const json = (await response.json()) as ContributionsResponse;
      setData(json);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : errorMessage
      );
    } finally {
      setLoading(false);
    }
  }, [username, errorMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="origin-top scale-[0.9]">
        <CalendarGrid contributions={data.contributions} />
      </div>
      <div className=''>
        {data.total} contributions in the last year
      </div>
    </div>
  );
}

interface CalendarGridProps {
  contributions: Array<Contribution>;
}

function CalendarGrid({ contributions }: CalendarGridProps) {
  if (contributions.length === 0) return <div>No contributions</div>;

  const sorted = [...contributions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const lastDate = new Date(`${sorted[sorted.length - 1].date}T00:00:00Z`);

  const elevenMonthsAgo = new Date(lastDate);
  elevenMonthsAgo.setUTCMonth(elevenMonthsAgo.getUTCMonth() - 10);

  const filtered = sorted.filter((c) => {
    const contributionDate = new Date(`${c.date}T00:00:00Z`);
    return contributionDate >= elevenMonthsAgo;
  });

  if (filtered.length === 0) return <div>No contributions</div>;

  const actualFirstDate = new Date(`${filtered[0].date}T00:00:00Z`);

  const startDate = new Date(actualFirstDate);
  startDate.setUTCDate(startDate.getUTCDate() - startDate.getUTCDay());

  const endDate = new Date(lastDate);
  endDate.setUTCDate(endDate.getUTCDate() + (6 - endDate.getUTCDay()));

  const contributionMap = new Map(filtered.map((c) => [c.date, c]));
  const weeks: Array<Array<Contribution | null>> = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const week: Array<Contribution | null> = [];
    for (let i = 0; i < 7; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const contribution = contributionMap.get(dateStr);
      week.push(contribution ?? null);
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    weeks.push(week);
  }

  const monthLabels: Array<{ weekIndex: number; month: string }> = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const firstDayOfWeek = new Date(startDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);
    const month = firstDayOfWeek.getUTCMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      monthLabels.push({ weekIndex, month: MONTH_LABELS[month] });
    }
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Month labels - aligned with week columns below */}
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => {
          const monthLabel = monthLabels.find(m => m.weekIndex === weekIndex);
          return (
            <div key={weekIndex} className="w-3 text-center text-[0]">
              {monthLabel && (
                <span className="inline-block whitespace-nowrap text-[11px] text-[#666] [.theme-dark_&]:text-[#8b949e]">
                  {monthLabel.month}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Calendar grid */}
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((contribution, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                title={contribution ? `${contribution.date}` : ''}
                className={`h-3 w-3 rounded-[2px] ${
                  LEVEL_BG_CLASSES[contribution?.level ?? 0]
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
