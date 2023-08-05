import useGetConversation from "@hooks/Queries/Chat/useGetConversation";
import ConversationMessages from "./ConversationMessages.tsx";
import NormalChatTopInfo from "./NormalChatTopInfo";
import { RootState } from "@redux/config/store";
import { useSelector } from "react-redux";
import Header from "./Header";

interface IProps {
  conversationId: string;
}

const SelectedConversation = ({ conversationId }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const chat = useGetConversation({ chatId: conversationId });


  if (chat.data) {
    return (
      <div className="flex flex-col h-screen">
        <Header chat={chat.data} reduxUser={reduxUser} />
        <div className="overflow-y-auto flex-grow relative" >
          <div className="flex h-full w-full overflow-x-hidden">
            <div className="flex flex-col w-full h-full justify-start mx-auto px-4">
              <div className="flex flex-col gap-4">
                <NormalChatTopInfo chat={chat.data} reduxUser={reduxUser} />

                <ConversationMessages
                  reduxUser={reduxUser}
                  isGroupChat={chat.data.isGroupChat}
                  conversationId={conversationId}
                />
              
              </div>
            </div>
          </div>
          <div className="flex flex-row absolute bottom-3 justify-end w-full pr-8">
            down button
          </div>
        </div>
        <div className="sticky bottom-0 bg-red-100 min-h-16">composer section</div>
      </div>
    );
  }
};

export default SelectedConversation;
