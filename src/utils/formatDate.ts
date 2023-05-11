import moment from "moment";

export const formatDate = (date: string): string => {
  const now = moment();
  const tweetMoment = moment(date);
  const diffInMinutes = now.diff(tweetMoment, "minutes");
  const diffInHours = now.diff(tweetMoment, "hours");
  const diffInDays = now.diff(tweetMoment, "days");
  const diffInMonths = now.diff(tweetMoment, "months");

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else if (diffInDays < 7) {
    return tweetMoment.format("MMM D");
  } else if (diffInMonths < 12) {
    return tweetMoment.format("MMM D");
  } else {
    return tweetMoment.format("MMM D YYYY");
  }
};
