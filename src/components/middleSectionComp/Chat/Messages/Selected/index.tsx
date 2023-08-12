import useGetConversation from "@hooks/Queries/Chat/useGetConversation";
import ConversationMessages from "./ConversationMessages.tsx";
import { useInView } from "react-intersection-observer";
import NormalChatTopInfo from "./NormalChatTopInfo";
import DownScrollButton from "./DownScrollButton";
import { RootState } from "@redux/config/store";
import { useSelector } from "react-redux";
import ChatComposer from "./ChatComposer";
import { useRef } from "react";
import Header from "./Header";

interface IProps {
  conversationId: string;
}

const SelectedConversation = ({ conversationId }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const chat = useGetConversation({ chatId: conversationId });

  const myRef = useRef<HTMLDivElement>(null);
  const { ref: bottomMessagesRef, inView } = useInView();

  if (chat.data) {
    return (
      <div className="flex flex-col h-screen">
        <Header chat={chat.data} reduxUser={reduxUser} />
        <div className="overflow-y-auto flex-grow relative">
          <div className="flex h-full w-full overflow-x-hidden">
            <div className="flex flex-col w-full h-full justify-start mx-auto px-4">
              <div className="flex flex-col gap-4" ref={myRef}>
                {!chat.data.isGroupChat && (
                  <NormalChatTopInfo chat={chat.data} reduxUser={reduxUser} />
                )}

                <ConversationMessages
                  inView={inView}
                  reduxUser={reduxUser}
                  conversation={chat.data}
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
