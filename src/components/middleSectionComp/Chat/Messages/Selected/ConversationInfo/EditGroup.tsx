import AvatarGroup from "@atlaskit/avatar-group";
import { UserState } from "@redux/slices/userSlice";
import React from "react";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  otherParticipants: {
    user: IUser;
    hasLeft: boolean;
    isPinned: boolean;
  }[];
}

const EditGroup = ({ chat, reduxUser, otherParticipants }: IProps) => {
  const avatarGroupPayload = otherParticipants.map((participant) => ({
    name: participant.user.displayName,
    src: participant.user.avatar,
  }));

  return (
    <div className="flex flex-row py-3 px-4">
      <div className="mr-3">
        <AvatarGroup
          appearance="stack"
          size="large"
          maxCount={3}
          data={avatarGroupPayload}
        />
      </div>

      <div className="flex flex-row grow justify-between items-center">
        {/* group name || participants displaynames */}
        <div className="line-clamp-1 font-bold min-w-0 break-words">
          <span>
            {otherParticipants.map((user) => user.user.displayName).join(", ")}
          </span>
        </div>

        {/* edit */}
        <a
          href={`/messages/${chat._id}/group_info`}
          className="text-primary-base hover:underline"
        >
          Edit
        </a>
      </div>
    </div>
  );
};

export default EditGroup;
