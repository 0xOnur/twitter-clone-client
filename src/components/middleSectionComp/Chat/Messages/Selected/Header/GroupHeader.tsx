import { UserState } from "@redux/slices/userSlice";
import AvatarGroup from "@atlaskit/avatar-group";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { InfoIcon } from "@icons/Icon";
import { useNavigate } from "react-router-dom";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
}

const GroupHeader = ({ chat, reduxUser }: IProps) => {
  const navigate = useNavigate();

  const participantsAvatars = chat.participants.map((participant) => ({
    src: participant.user.avatar || "",
    name: participant.user.displayName,
    href: `/${participant.user.username}`,
  }));

  const participantsDisplayNames = chat.participants
    .slice(0, 2)
    .map((participant) => {
      return participant.user._id === reduxUser.user?._id
        ? "You"
        : participant.user.displayName;
    });

  return (
    <div className="z-10 top-0 sticky">
      <div className="h-[53px] bg-[color:var(--background-primary-alpha)] backdrop-blur-md">
        <div className="flex flex-row max-w-600px w-full h-full items-center mx-auto px-5">
          <div className="flex flex-row h-full items-center w-full">
            <div onClick={(e) => e.stopPropagation()}>
              {chat.chatImage ? (
                <Avatar
                  avatar={chat.chatImage}
                  avatarSize="w-9 h-9"
                  href={`/messages/${chat._id}`}
                />
              ) : (
                <div className="mr-3">
                  <AvatarGroup
                    appearance="stack"
                    maxCount={2}
                    size="large"
                    data={participantsAvatars}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-content items-center gap-2">
              {chat.chatName ? (
                <h2 className="font-bold truncate text-left">
                  {chat.chatName}
                </h2>
              ) : (
                <div className="flex gap-2 truncate">
                  {participantsDisplayNames.map((name, index) => (
                    <span key={index} className="font-bold truncate text-left">
                      {name}
                      {participantsDisplayNames.length !== index + 1 && ","}
                    </span>
                  ))}
                  {chat.participants.length > 2 && (
                    <span className="font-bold text-left">
                      and {chat.participants.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex relative min-w-[56px] min-h-[32px] items-center justify-end">
            <button
              title="Info"
              onClick={() => {
                navigate(`/messages/${chat._id}/info`);
              }}
              className="flex justify-center items-center min-w-[36px] min-h-[36px] hover:bg-[color:var(--background-third)] rounded-full duration-200"
            >
              <InfoIcon className="w-5 h-5 antialiased" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
