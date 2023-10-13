import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { UserState } from "@redux/slices/userSlice";
import AvatarGroup from "@atlaskit/avatar-group";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import React from "react";
import { SelectedIcon } from "@icons/Icon";
import { useModal } from "contexts/ModalContext";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  isGroupMode?: boolean;
  isMessageShare?: boolean;
  selectedUsers?: IUser[];
  selectedConversations?: IChat[];
  setSelectConversations?:React.Dispatch<React.SetStateAction<IChat[]>>;
}

const GroupPreview = ({
  chat,
  reduxUser,
  isGroupMode,
  isMessageShare,
  selectedUsers,
  selectedConversations,
  setSelectConversations,
}: IProps) => {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const newSelectedConversations = [...(selectedConversations || [])];

  const isAddedConversation = newSelectedConversations.some(
    (selectedConversation) => selectedConversation._id === chat._id
  )

  const handleSelectConversation = () => {
    if (isMessageShare) {
      if (!isAddedConversation) {
        newSelectedConversations.push(chat);
        setSelectConversations!((prev) => [...prev, chat]);
      }
    }else {
      closeModal();
      navigate(`/messages/${chat._id}`);
    }
  }

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

  const chatClassNames = classNames(
    "grid grid-cols-chat w-full items-start p-4 hover:bg-gray-extraLight duration-200 group",
    {
      "cursor-not-allowed opacity-50":
      !isMessageShare && (selectedUsers?.length! > 0 || isGroupMode),
    }
  );
  return (
    <div className="relative">
      <button
        key={chat._id}
        disabled={
          !isMessageShare && (selectedUsers?.length! > 0 || isGroupMode)
        }
        className={chatClassNames}
        onClick={handleSelectConversation}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {chat.chatImage ? (
            <Avatar avatar={chat.chatImage} href={`/messages/${chat._id}`} />
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

        <div className="flex flex-col">
          <div className="grid grid-cols-content items-center gap-2">
            {chat.chatName ? (
              <h2 className="font-bold truncate text-left">{chat.chatName}</h2>
            ) : (
              <div className="flex gap-2 truncate">
                  <span className="font-bold truncate text-left">
                    {participantsDisplayNames.join(", ")}
                  </span>
                {chat.participants.length > 2 && (
                  <span className="font-bold text-left">
                    and {chat.participants.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>

          <p className="line-clamp-1 text-left">
            {chat.participants.length} people
          </p>
        </div>

        {selectedConversations &&
          selectedConversations.some(
            (selectedConversation) => selectedConversation._id === chat._id
          ) && (
            <div className="">
              <SelectedIcon className="w-5 h-5 fill-primary-base" />
            </div>
          )}
      </button>
    </div>
  );
};

export default GroupPreview;
