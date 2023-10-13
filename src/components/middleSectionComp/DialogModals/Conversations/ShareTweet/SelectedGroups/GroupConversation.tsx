import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { UserState } from "@redux/slices/userSlice";
import AvatarGroup from "@atlaskit/avatar-group/";
import { CancelIcon } from "@icons/Icon";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
}

const GroupConversation = ({ chat, reduxUser }: IProps) => {
  const userAvatarsPayload = chat.participants
    .filter((participant) => participant.user._id !== reduxUser.user?._id)
    .map((participant) => ({
      src: participant.user.avatar || "",
      name: participant.user.displayName,
    }));

  const participantsDisplayNames = chat.participants
    .filter((participant) => participant.user._id !== reduxUser.user?._id)
    .map((participant) => [participant.user.displayName]);

  return (
    <div className="flex flex-row h-full pl-1 pr-3 items-center hover:bg-primary-light duration-200">
      {chat.chatImage ? (
        <Avatar avatar={chat.chatImage} avatarSize="w-6 h-6" />
      ) : (
        <AvatarGroup
          appearance="stack"
          size="small"
          data={userAvatarsPayload}
        />
      )}
      <span className="font-bold truncate text-left">
        {chat.chatName ? chat.chatName : participantsDisplayNames.join(", ")}
      </span>
      <div className="pl-3">
        <CancelIcon className="w-5 h-5 fill-primary-base" />
      </div>
    </div>
  );
};

export default GroupConversation;
