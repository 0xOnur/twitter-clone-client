import moment from "moment";

export const formatDate = (date: string) => {
  const now = moment.utc();
  const tweetMoment = moment.utc(date);
  
  const diffInMinutes = now.diff(tweetMoment, "minutes");
  const diffInHours = now.diff(tweetMoment, "hours");
  const diffInDays = now.diff(tweetMoment, "days");
  const diffInMonths = now.diff(tweetMoment, "months");
  const diffInYears = now.diff(tweetMoment, "years");

  if (diffInMinutes < 60) {
    return tweetMoment.fromNow(true);
  } else if (diffInHours < 24) {
    return tweetMoment.fromNow(true);
  } else if (diffInDays < 30) {
    return tweetMoment.format("MMM D"); 
  } else if (diffInMonths < 12) {
    return tweetMoment.format("MMM D");
  } else if (diffInYears >= 1) {
    return tweetMoment.format("MMM D YYYY");
  }
};
