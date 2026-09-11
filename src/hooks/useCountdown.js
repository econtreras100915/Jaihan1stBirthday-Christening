/**
 * =============================================================================
 *  useCountdown — live countdown hook
 * =============================================================================
 *  Give it a target date (ISO string or Date) and it returns the remaining
 *  days / hours / minutes / seconds, updating once per second. Once the
 *  target has passed, every value settles at 0 and `isOver` becomes true.
 *
 *  Used by: components/CountdownSection.jsx
 * =============================================================================
 */
import { useEffect, useState } from "react";

function getTimeLeft(targetDate) {
  const total = Math.max(0, targetDate.getTime() - Date.now());
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    isOver: total <= 0,
  };
}

export function useCountdown(targetDateInput) {
  const targetDate =
    targetDateInput instanceof Date ? targetDateInput : new Date(targetDateInput);

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(targetDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDateInput]);

  return timeLeft;
}

export default useCountdown;
