import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { MessagesIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import { useState } from "react";
import { useRef, useEffect } from "react";

interface IProps {
  reduxUser: UserState;
  message: IMessage;
  conversation: IChat;
}

const GroupMessageSeen = ({ message, conversation, reduxUser }: IProps) => {
  const [showReadList, setShowReadList] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const messageReadIDs = message.readBy?.filter(
    (user) => user._id !== reduxUser.user._id
  );

  let seenText = "Sent";

  const participantsExceptCurrentUser = conversation.participants
    .filter((p) => p.user._id !== reduxUser.user._id)
    .map((p) => p.user._id);

  const seenCount = participantsExceptCurrentUser.filter((participantId) =>
    messageReadIDs?.some((user) => user._id === participantId)
  ).length;

  if (seenCount === participantsExceptCurrentUser.length) {
    seenText = "Seen by everyone";
  } else if (seenCount > 0) {
    seenText = `Seen by ${seenCount} people`;
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        showReadList &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setShowReadList(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showReadList]);

  return (
    <div className="relative mb-1">
      <button
        onClick={() => {
          setShowReadList(!showReadList);
        }}
        className="hover:underline"
      >
        {seenText}
      </button>

      {showReadList && messageReadIDs && messageReadIDs.length > 0 && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-1 border shadow-md min-w-[260px] min-h-[30px] max-w-[360px] max-h-[480px] rounded-2xl overflow-auto"
        >
          <div className="flex flex-col bg-white">
            {messageReadIDs.map((user) => (
              <div key={user._id} className="py-3 px-4 hover:bg-gray-50 duration-200">
                <div className="flex flex-row items-center">
                  <Avatar
                    avatar={user.avatar!}
                    href={`/${user.username}`}
                    avatarSize="w-10 h-10"
                  />

                  <div className="flex flex-row gap-5 justify-between items-center w-full">
                    <div className="flex flex-col  max-w-full text-base">
                      <div className="flex shrink">
                        <a
                          href={`/${user.username}`}
                          className="text-black line-clamp-1 font-bold hover:underline"
                        >
                          {user.displayName}
                        </a>
                      </div>
                      <div className="flex shrink">
                        <a href={`/${user.username}`} className="line-clamp-1">
                          @{user.username}
                        </a>
                      </div>
                    </div>

                    <button className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border">
                      <MessagesIcon className="w-[22px] h-[22px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupMessageSeen;
