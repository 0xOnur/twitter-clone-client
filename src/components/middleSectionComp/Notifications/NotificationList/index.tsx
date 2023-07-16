import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { LoadingIcon, RetryIcon } from "@icons/Icon";
import { getUserNotifications } from "api/userApi";
import RetweetNotif from "./Type/RetweetNotif";
import FollowNotif from "./Type/FollowNotif";
import ReplyNotif from "./Type/ReplyNotif";
import LikeNotif from "./Type/LikeNotif";
import React, { useEffect } from "react";

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
  } = useInfiniteQuery(["bookmarks"], fetchNotifications, {
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
  }, [inView, isFetchingNextPage]);

  if (status === "loading") {
    return (
      <div className="flex w-full mt-20 items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col max-w-600px w-full justify-center items-center py-5 px-3">
        <span className="mb-5 text-center">
          Something went wrong. Try reloading.
        </span>
        <button
          onClick={() => refetch()}
          className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
        >
          <RetryIcon className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Retry</span>
        </button>
      </div>
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
          <div key={index} className="border-t">
            {page.data.map((notification: INotification) => (
              <div key={notification._id} className="border-b">
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
