import { EditGroupModal } from "@components/middleSectionComp/DialogModals";
import AvatarGroup from "@atlaskit/avatar-group";
import { UserState } from "@redux/slices/userSlice";
import { useModal } from "contexts/ModalContext";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";

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
  const { openModal, closeModal } = useModal();

  const avatarGroupPayload = otherParticipants.map((participant) => ({
    name: participant.user.displayName,
    src: participant.user.avatar,
  }));

  return (
    <div className="flex flex-row py-3 px-4">
      {chat.chatImage ? (
        <Avatar avatar={chat.chatImage} avatarSize="w-10 h-10" />
      ) : (
        <div className="mr-3">
          <AvatarGroup
            appearance="stack"
            size="large"
            maxCount={3}
            data={avatarGroupPayload}
          />
        </div>
      )}

      <div className="flex flex-row grow justify-between items-center">
        <div className="line-clamp-1 font-bold min-w-0 break-words">
          <span>
            {chat.chatName ||
              otherParticipants.map((user) => user.user.displayName).join(", ")}
          </span>
        </div>

        <button
          onClick={() => {
            openModal(<EditGroupModal chat={chat} closeModal={closeModal} />);
          }}
          className="text-primary-base hover:underline"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditGroup;
