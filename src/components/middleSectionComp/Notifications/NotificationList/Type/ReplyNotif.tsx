import { useMarkNotification } from "@hooks/notifications/useMarkNotification";
import { useEffect } from "react";
import { TweetCard } from "@components/middleSectionComp/TweetCard";

interface IProps {
  notifId: string;
  isRead: boolean;
  tweetId: string;
}

const ReplyNotif = ({ notifId, isRead, tweetId }: IProps) => {
  const { mutate } = useMarkNotification({ notificationId: notifId });
  
  useEffect(() => {
    if (!isRead) {
      mutate(notifId);
    }
  }, [isRead, mutate, notifId]);

  return (
    <TweetCard
      isAuthenticated={true} //
      pageType="home"
      tweetId={tweetId}
      key={tweetId}
    />
  );
};

export default ReplyNotif;
