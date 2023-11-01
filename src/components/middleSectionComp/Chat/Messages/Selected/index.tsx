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
import { LoadingIcon } from "@icons/Icon";
import { RefetchError } from "@components/Others";

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
  }, [conversationId, socket]);

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
      <RefetchError refetch={refetch} />
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
