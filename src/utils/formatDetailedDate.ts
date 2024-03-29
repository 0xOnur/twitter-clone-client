export const formatDetailedDate = (date: string): string => {
  const newDate = new Date(date);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const time = new Intl.DateTimeFormat("en-US", timeOptions).format(newDate);
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(newDate);

  return `${time} · ${formattedDate}`;
};
