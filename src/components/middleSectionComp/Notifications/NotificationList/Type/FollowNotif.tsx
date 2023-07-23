import { useMarkNotification } from "@hooks/mutations/Notifications/useMarkNotification";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { ProfileIcon } from "@icons/Icon";
import { useEffect } from "react";

interface IProps {
  notifId: string;
  isRead: boolean;
  username: string;
  avatar: string;
}

const FollowNotif = ({ notifId, isRead, username, avatar }: IProps) => {
  const { mutate } = useMarkNotification({ notificationId: notifId });

  useEffect(() => {
    if(!isRead) {
      mutate(notifId);
    }
  }, [isRead, mutate, notifId])

  return (
    <a
      href={`/${username}`}
      className="flex flex-row py-3 px-4 hover:bg-gray-extraLight"
    >
      <div className="flex flex-row ">
        <div className="mr-3">
          <ProfileIcon
            isActive
            className="w-[30px] h-[30px] fill-primary-base"
          />
        </div>
        <div className="flex flex-col">
          <div className="mb-3 pr-5 w-fit">
            <Avatar avatar={avatar} href={`/${username}`} avatarSize="w-8 h-8" />
          </div>
          <div className="flex flex-row gap-1">
            <span className="font-bold hover:underline">{username}</span>
            <span>followed you</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default FollowNotif;
