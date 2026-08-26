"use client";

import NumberFlow from "@number-flow/react";
import { useIstTime } from "@/hooks/useIstTime";

export function Timer() {
  const { hours, minutes, seconds } = useIstTime();

  return (
    <span
      aria-label="Current time in India"
      className="flex items-center gap-1 text-sm tabular-nums"
    >
      <NumberFlow value={hours} format={{ minimumIntegerDigits: 2 }} suffix=" :" />
      <NumberFlow value={minutes} format={{ minimumIntegerDigits: 2 }} suffix=" :" />
      <NumberFlow value={seconds} format={{ minimumIntegerDigits: 2 }} />
      <span className="ml-1">IST</span>
    </span>
  );
}
