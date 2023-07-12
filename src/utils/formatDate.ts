import moment from "moment";

export const formatDate = (date: string): string => {
  const now = moment.utc();
  const tweetMoment = moment.utc(date);
  
  const diffInMinutes = now.diff(tweetMoment, "minutes");
  const diffInMonths = now.diff(tweetMoment, "months");

  if (diffInMinutes < 60) {
    return tweetMoment.fromNow(true); 
  } else if (diffInMonths < 12) {
    return tweetMoment.format("MMM D");
  } else {
    return tweetMoment.format("MMM D YYYY");
  }
};

