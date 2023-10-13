import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { InfoIcon, VerifiedIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
}

const NormalHeader = ({ chat, reduxUser }: IProps) => {
  const navigate = useNavigate();

  const otherParticipant = chat.participants.find(
    (participant) => participant.user._id !== reduxUser.user?._id
  );
  return (
    <div className="sticky top-0 z-10">
      <div className="h-[53px] bg-white/80 backdrop-blur-md">
        <div className="flex flex-row max-w-600px w-full h-full items-center mx-auto px-5">
          <div className="flex flex-row h-full items-center w-full">
            <Avatar
              avatarSize="w-9 h-9"
              avatar={otherParticipant?.user.avatar!}
              href={`/${otherParticipant?.user.username}`}
            />
            <div className="grid grid-cols-content items-center gap-2">
              <h2 className="font-bold truncate text-left">
                {otherParticipant?.user.displayName}
              </h2>
              <div className="flex flex-row items-center">
                {otherParticipant?.user.isVerified && (
                  <VerifiedIcon className="w-5 h-5 fill-primary-base" />
                )}
              </div>
            </div>
          </div>
          <div className="flex relative min-w-[56px] min-h-[32px] items-center justify-end">
            <button
              onClick={() => {
                navigate(`/messages/${chat._id}/info`);
              }}
              title="Info"
              className="flex justify-center items-center min-w-[36px] min-h-[36px] hover:bg-gray-extraLight rounded-full duration-200"
            >
              <InfoIcon className="w-5 h-5 antialiased " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalHeader;
