import useGetConversations from "@hooks/Chat/Queries/useGetConversations";
import ChatWelcomeMessage from "./ChatWelcomeMessage";
import { LoadingIcon, RetryIcon } from "@icons/Icon";
import { RootState } from "@redux/config/store";
import { useSelector } from "react-redux";
import ChatPreview from "./ChatPreview";
import ChatHeader from "./ChatHeader";

interface IProps {
  selectedChat?: string;
}

const Conversations = ({ selectedChat }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const chats = useGetConversations();

  if (chats.isLoading) {
    return (
      <div className="flex flex-col border-x h-full w-full overflow-y-auto">
        <ChatHeader />
        <div className="flex flex-col items-center rounded-2xl p-5 m-3">
          <LoadingIcon />
        </div>
      </div>
    );
  }

  if (chats.error) {
    return (
      <div className="flex flex-col border-x h-full w-full overflow-y-auto">
        <ChatHeader />
        <div className="flex flex-col max-w-600px w-full justify-center items-center py-5 px-3">
          <span className="mb-5 text-center">
            Something went wrong. Try reloading.
          </span>
          <button
            onClick={() => chats.refetch()}
            className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
          >
            <RetryIcon className="w-6 h-6 text-white" />
            <span className="font-bold text-white">Retry</span>
          </button>
        </div>
      </div>
    );
  }

  if (chats.data && chats.data.length > 0) {
    const pinnedChatsExist = chats.data.some(
      (chat) =>
        chat.participants.find(
          (participant) => participant.user._id === reduxUser.user?._id
        )?.isPinned
    );

    const pinnedChats = chats.data.filter((chat) =>
      chat.participants.find(
        (participant) =>
          participant.user._id === reduxUser.user?._id && participant.isPinned
      )
    );

    const normalChats = chats.data.filter(
      (chat) =>
        !chat.participants.find(
          (participant) =>
            participant.user._id === reduxUser.user?._id && participant.isPinned
        )
    );

    return (
      <div className="flex flex-col border-x h-screen w-full overflow-hidden">
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
            {chats.data.map((chat) => (
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
    <div className="flex flex-col border-x h-full w-full overflow-y-auto">
      <ChatHeader />
      <ChatWelcomeMessage />
    </div>
  );
};

export default Conversations;
