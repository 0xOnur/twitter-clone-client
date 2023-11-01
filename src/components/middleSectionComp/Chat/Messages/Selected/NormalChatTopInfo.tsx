import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { UserState } from "@redux/slices/userSlice";
import { formatDate } from "@utils/formatDate";
import { useNavigate } from "react-router-dom";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
}

const NormalChatTopInfo = ({ chat, reduxUser }: IProps) => {
    const navigate = useNavigate();
  const otherParticipant = chat.participants.find(
    (participant) => participant.user._id !== reduxUser.user?._id
  );

  return (
    <button onClick={() => {
        navigate(`/${otherParticipant?.user.username}`);
    }} className=" w-full border-b-2 border-[color:var(--background-third)] hover:bg-[color:var(--background-third)] duration-200 rounded-sm">
      <div className="flex flex-col mb-4 items-center py-5 px-5">
        <Avatar
          avatar={otherParticipant?.user.avatar!}
          href={`/${otherParticipant?.user.username}`}
          avatarSize="w-16 h-16"
        />
        <div className="flex flex-col">
          <h2 className="font-bold">{otherParticipant?.user.displayName}</h2>
          <span className="text-[color:var(--color-base-secondary)]">
            @{otherParticipant?.user.username}
          </span>
        </div>
        <div className="mt-3">
          <span className="whitespace-pre-line">
            {otherParticipant?.user?.bio}
          </span>
        </div>

        <div className="flex flex-row gap-1 py-3 items-center">
          <span className="text-[color:var(--color-base-secondary)] text-[14px] leading-[10px]">
            Joined {formatDate(otherParticipant?.user.createdAt!)}
          </span>
          <span className="text-[color:var(--color-base-secondary)] text-[14px] leading-[10px]">- {otherParticipant?.user?.location}</span>
        </div>
      </div>
    </button>
  );
};

export default NormalChatTopInfo;
