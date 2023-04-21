export const formatDetailedDate = (date: Date): string => {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    };
  
    const time = new Intl.DateTimeFormat("en-US", timeOptions).format(date);
    const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(date);
  
    return `${time} · ${formattedDate} ·`;
  };
  
  const tweetDate = new Date("2023-04-21T02:10:00.000Z")
  console.log(formatDetailedDate(tweetDate));
  