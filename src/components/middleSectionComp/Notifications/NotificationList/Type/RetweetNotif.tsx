import { useMarkNotification } from "@hooks/Notifications/useMarkNotification";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { ReTweetIcon } from "@icons/Icon";
import { useEffect } from "react";

interface IProps {
  notifId: string;
  isRead: boolean;
  tweetId: string;
  sender: IUser;
  receiver: IUser;
}

const RetweetNotif = ({
  notifId,
  isRead,
  tweetId,
  sender,
  receiver,
}: IProps) => {
  const { mutate } = useMarkNotification({ notificationId: notifId });

  useEffect(() => {
    if (!isRead) {
      mutate(notifId);
    }
  }, [isRead, mutate, notifId]);

  return (
    <a
      href={`/${receiver.username}/status/${tweetId}`}
      className="flex flex-row py-3 px-4 hover:bg-gray-extraLight"
    >
      <div className="flex flex-row ">
        <div className="mr-3">
          <ReTweetIcon className="w-[30px] h-[30px] fill-green-base" />
        </div>
        <div className="flex flex-col">
          <div className="mb-3 pr-5 w-fit">
            <Avatar
              avatar={sender.avatar!}
              href={`/${sender.username}`}
              avatarSize="w-8 h-8"
            />
          </div>
          <div className="flex flex-row gap-1">
            <span className="font-bold hover:underline">
              {sender.displayName}
            </span>
            <span>Retweeted your Tweet</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default RetweetNotif;
