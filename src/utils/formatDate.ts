import moment from "moment";

export const formatDate = (date: Date): string => {
  const now = moment();
  const tweetMoment = moment(date);
  const diffInMinutes = now.diff(tweetMoment, "minutes");
  const diffInHours = now.diff(tweetMoment, "hours");
  const diffInDays = now.diff(tweetMoment, "days");

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else if (diffInDays < 7) {
    return tweetMoment.format("MMM D");
  } else {
    return tweetMoment.format("MMM D");
  }
};

const tweetDate = new Date("2023-04-20T21:26:00");
console.log(formatDate(tweetDate));
