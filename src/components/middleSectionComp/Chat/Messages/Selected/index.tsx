import ChatComposer from "@components/middleSectionComp/Chat/ChatComposer";
import useGetConversation from "@hooks/Chat/Queries/useGetConversation";
import ConversationMessages from "./ConversationMessages";
import { useSocketContext } from "contexts/SocketContext";
import { useInView } from "react-intersection-observer";
import NormalChatTopInfo from "./NormalChatTopInfo";
import DownScrollButton from "./DownScrollButton";
import { RootState } from "@redux/config/store";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import Header from "./Header";
import ConversationInfo from "./ConversationInfo";
import { LoadingIcon, RetryIcon } from "@icons/Icon";

interface IProps {
  conversationId: string;
}

const SelectedConversation = ({ conversationId }: IProps) => {
  const { socket } = useSocketContext();

  //get page url
  const url = window.location.href;
  const urlArray = url.split("/");
  const pageUrl = urlArray[urlArray.length - 1];

  useEffect(() => {
    socket?.emit("joinConversation", conversationId);
    return () => {
      socket?.emit("leaveConversation", conversationId);
    };
  }, [conversationId]);

  const reduxUser = useSelector((state: RootState) => state.user);
  const { data, status, refetch } = useGetConversation({
    chatId: conversationId,
  });

  const myRef = useRef<HTMLDivElement>(null);
  const { ref: bottomMessagesRef, inView } = useInView();

  if (pageUrl === "info" && data) {
    return <ConversationInfo chat={data} reduxUser={reduxUser} />;
  }

  if (status === "loading") {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col max-w-600px w-full h-full justify-center items-center py-5 px-3">
        <span className="mb-5 text-center">
          Something went wrong. Try reloading.
        </span>
        <button
          onClick={() => refetch()}
          className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
        >
          <RetryIcon className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Retry</span>
        </button>
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex flex-col h-screen">
        <div className="overflow-y-auto flex-grow relative">
          <div className="flex flex-col h-full w-full overflow-x-hidden">
            <Header chat={data} reduxUser={reduxUser} />

            <div className="flex flex-col w-full h-full justify-start mx-auto px-4">
              <div className="flex flex-col gap-4" ref={myRef}>
                {!data.isGroupChat && (
                  <NormalChatTopInfo chat={data} reduxUser={reduxUser} />
                )}

                <ConversationMessages
                  inView={inView}
                  reduxUser={reduxUser}
                  conversation={data}
                  bottomMessagesRef={bottomMessagesRef}
                />
              </div>
            </div>
          </div>

          <DownScrollButton inView={inView} myRef={myRef} />
        </div>

        <ChatComposer conversationId={conversationId} />
      </div>
    );
  }
};

export default SelectedConversation;
