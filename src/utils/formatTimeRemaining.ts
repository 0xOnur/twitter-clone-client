export type TimeRemaining = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const getTimeRemaining = (expiryDate: string | Date): TimeRemaining =>{
  const total = Date.parse(new Date(expiryDate).toISOString()) - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function formatTimeRemaining(timeRemaining: TimeRemaining): string {
  const { total, days, hours, minutes, seconds } = timeRemaining;
  
  if (total <= 0) return "Poll expired.";
  if (days > 0) return `${days} days left`;
  if (hours > 0) return `${hours} hours left`;
  if (minutes > 0) return `${minutes} minutes left`;
  
  return `${seconds} seconds left`;
}
