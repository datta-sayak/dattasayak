import { useEffect, useState } from 'react';

export function useIstTime() {
  const [istTime, setIstTime] = useState<number | null>(null);

  useEffect(() => {
    const updateIstTime = () => {
      const parts = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(new Date());
      const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
      setIstTime(
        Number(values.hour) * 10000 + Number(values.minute) * 100 + Number(values.second),
      );
    };

    updateIstTime();
    const intervalId = window.setInterval(updateIstTime, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return {
    hours: istTime === null ? 0 : Math.floor(istTime / 10000),
    minutes: istTime === null ? 0 : Math.floor((istTime % 10000) / 100),
    seconds: istTime === null ? 0 : istTime % 100,
  };
}
