import AvatarGroup from "@atlaskit/avatar-group/";
import { CancelIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import React from "react";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
}

const GroupConversation = ({ chat, reduxUser }: IProps) => {
  const userAvatarsPayload = chat.participants
    .filter((participant) => participant.user._id !== reduxUser.user._id)
    .map((participant) => ({
      src: participant.user.avatar || "",
      name: participant.user.displayName,
      href: `/${participant.user.username}`,
    }));

  const participantsDisplayNames = chat.participants.filter((participant) => participant.user._id !== reduxUser.user._id).map((participant) => [
    participant.user.displayName
  ])

  return (
    <div className="flex flex-row h-full pl-1 pr-3 items-center hover:bg-primary-light duration-200">
      <AvatarGroup appearance="stack" size="small" data={userAvatarsPayload} />
      <span className="font-bold truncate text-left">
        {participantsDisplayNames.join(", ")}
      </span>
      <div className="pl-3">
        <CancelIcon className="w-5 h-5 fill-primary-base" />
      </div>
    </div>
  );
};

export default GroupConversation;
