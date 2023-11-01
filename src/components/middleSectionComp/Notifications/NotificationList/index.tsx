import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { LoadingIcon } from "@icons/Icon";
import { getUserNotifications } from "api/userApi";
import RetweetNotif from "./Type/RetweetNotif";
import FollowNotif from "./Type/FollowNotif";
import ReplyNotif from "./Type/ReplyNotif";
import LikeNotif from "./Type/LikeNotif";
import { useEffect } from "react";
import { RefetchError } from "@components/Others";

const Notifications = () => {
  const { ref, inView } = useInView();

  const fetchNotifications = ({ pageParam = 0 }) => {
    return getUserNotifications(pageParam, 20);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["Notifications"], fetchNotifications, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return false;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "loading") {
    return (
      <div className="flex w-full mt-20 items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (status === "error") {
    return (
      <RefetchError refetch={refetch} />
    );
  }

  const renderNotification = (notification: INotification) => {
    switch (notification.type) {
      case "follow":
        return (
          <FollowNotif
            notifId={notification._id}
            isRead={notification.read}
            username={notification.sender.username}
            avatar={notification.sender?.avatar!}
          />
        )
      case "like":
        return (
          <LikeNotif
            notifId={notification._id}
            isRead={notification.read}
            tweetId={notification.tweetId}
            sender={notification.sender}
            receiver={notification.receiver}
          />
        )
      case "retweet":
        return (
          <RetweetNotif
            notifId={notification._id}
            isRead={notification.read}
            tweetId={notification.tweetId}
            sender={notification.sender}
            receiver={notification.receiver}
          />
        )
      case "reply":
        return (
          <ReplyNotif
            notifId={notification._id}
            isRead={notification.read}
            tweetId={notification.tweetId}
          />
        )

      default:
        return null;
    }
  };

  if (data) {
    return (
      <div>
        {data.pages.map((page, index) => (
          <div key={index} className="border-t-2 border-[color:var(--background-third)]">
            {page.data.map((notification: INotification) => (
              <div key={notification._id} className="border-b-2 border-[color:var(--background-third)]">
                {renderNotification(notification)}
              </div>
            ))}
          </div>
        ))}
        {isFetchingNextPage && (
          <div className="flex w-full mt-20 items-center justify-center">
            <LoadingIcon />
          </div>
        )}
        <div ref={ref} className="h-56" />
      </div>
    );
  }

  return <div>NotificationsList</div>;
};

export default Notifications;
