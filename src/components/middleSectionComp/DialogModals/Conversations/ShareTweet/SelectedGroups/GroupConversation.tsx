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
    <div className="flex relative group h-full items-center">
      <div className="absolute w-full h-full group-hover:bg-[color:var(--color-secondary)] opacity-[0.12] duration-200" />
      <div className="flex flex-row pr-3 items-center pl-1">
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
          <CancelIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
        </div>
      </div>
    </div>
  );
};

export default GroupConversation;
