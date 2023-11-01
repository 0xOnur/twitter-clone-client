import useGetConversations from "@hooks/Chat/Queries/useGetConversations";
import ChatWelcomeMessage from "./ChatWelcomeMessage";
import { LoadingIcon } from "@icons/Icon";
import { RootState } from "@redux/config/store";
import { useSelector } from "react-redux";
import ChatPreview from "./ChatPreview";
import ChatHeader from "./ChatHeader";
import { RefetchError } from "@components/Others";

interface IProps {
  selectedChat?: string;
}

const Conversations = ({ selectedChat }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const {chats, refetch, status} = useGetConversations();

  if (status === "loading") {
    return (
      <div className="flex flex-col h-full w-full overflow-y-auto">
        <ChatHeader />
        <div className="flex flex-col items-center rounded-2xl p-5 m-3">
          <LoadingIcon />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
     <RefetchError refetch={refetch} />
    );
  }

  if (chats && chats.length > 0) {
    const pinnedChatsExist = chats.some(
      (chat) =>
        chat.participants.find(
          (participant) => participant.user._id === reduxUser.user?._id
        )?.isPinned
    );

    const pinnedChats = chats.filter((chat) =>
      chat.participants.find(
        (participant) =>
          participant.user._id === reduxUser.user?._id && participant.isPinned
      )
    );

    const normalChats = chats.filter(
      (chat) =>
        !chat.participants.find(
          (participant) =>
            participant.user._id === reduxUser.user?._id && participant.isPinned
        )
    );

    return (
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <div className="overflow-y-auto flex-grow relative">
        <ChatHeader />
        {pinnedChatsExist ? (
          <div className="flex flex-col">
            <div className="py-3 pl-4">
              <span className="text-xl leading-6 font-extrabold">
                Pinned conversations
              </span>
            </div>
            {pinnedChats.map((chat) => (
              <ChatPreview
                key={chat._id}
                chat={chat}
                reduxUser={reduxUser}
                isSelectedChat={chat._id === selectedChat}
              />
            ))}
            {normalChats.length > 0 && (
              <>
                <div className="py-3 pl-4">
                  <span className="text-xl leading-6 font-extrabold">
                    All conversations
                  </span>
                </div>
                {normalChats.map((chat) => (
                  <ChatPreview
                    key={chat._id}
                    chat={chat}
                    reduxUser={reduxUser}
                    isSelectedChat={chat._id === selectedChat}
                  />
                ))}
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            {chats.map((chat) => (
              <ChatPreview
                key={chat._id}
                chat={chat}
                reduxUser={reduxUser}
                isSelectedChat={chat._id === selectedChat}
              />
            ))}
          </div>
        )}
        </div>
        
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto">
      <ChatHeader />
      <ChatWelcomeMessage />
    </div>
  );
};

export default Conversations;
