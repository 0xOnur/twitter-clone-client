import MessageTextInput from "@components/middleSectionComp/Chat/ChatComposer/MessageTextInput";
import SendButton from "@components/middleSectionComp/Chat/ChatComposer/SendButton";
import useSendTweetViaMessage from "@hooks/Chat/Mutations/useSendTweet";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  ChatComposerState,
  clearChatComposer,
} from "@redux/slices/chatComposerSlice";

interface IProps {
  tweet: ITweet;
  closeModal: () => void;
  chatComposer: ChatComposerState;
  selectedUsers: IUser[];
  selectedConversations: IChat[];
}

const Composer = ({
  tweet,
  closeModal,
  chatComposer,
  selectedUsers,
  selectedConversations,
}: IProps) => {
  const dispatch = useDispatch();
  const { mutate, isLoading, isSuccess } = useSendTweetViaMessage();

  const isReadyForTweetShare =
    selectedUsers.length > 0 || selectedConversations.length > 0;

  const handleSentMessage = () => {
    if (isReadyForTweetShare && tweet?._id) {
      const payload: any = {
        tweetId: tweet._id,
        selectedUsers: selectedUsers,
        selectedConversations: selectedConversations,
      };
      if (chatComposer.messageContent.length > 0) {
        payload.messageContent = chatComposer.messageContent;
      }

      mutate(payload);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      dispatch(clearChatComposer());
    }
  }, [isSuccess, closeModal, dispatch]);

  return (
    <div className="flex flex-col w-full border-t-2 border-[color:var(--background-third)] bg-[color:var(--background-primary)]">
      {isLoading && <div className="loader w-full" />}
      <div className="flex flex-row items-center mx-3 my-1 mt-2 p-1 rounded-2xl bg-[color:var(--background-third)]">
        <MessageTextInput
          placeholder="Add a comment"
          messageContent={chatComposer.messageContent}
          isDisabled={!isReadyForTweetShare || isLoading}
        />
        <SendButton
          isTweetShare={true}
          isReadyForTweetShare={isReadyForTweetShare && !isLoading}
          handleSentMessage={handleSentMessage}
        />
      </div>
    </div>
  );
};

export default Composer;
