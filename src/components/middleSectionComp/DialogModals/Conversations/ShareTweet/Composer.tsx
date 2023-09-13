import MessageTextInput from "@components/middleSectionComp/Chat/ChatComposer/MessageTextInput";
import SendButton from "@components/middleSectionComp/Chat/ChatComposer/SendButton";
import useSendTweetViaMessage from "@hooks/Chat/Mutations/useSendTweet";
import React, { useState, useEffect } from "react";

interface IProps {
  tweet: ITweet;
  closeModal: () => void;
  selectedUsers: IUser[];
  selectedConversations: IChat[];
}

const Composer = ({ tweet, closeModal, selectedUsers, selectedConversations }: IProps) => {
  const [messageContent, setMessageContent] = useState("");
  const { mutate, isLoading, isSuccess } = useSendTweetViaMessage();

  const isReadyForTweetShare =
    selectedUsers.length > 0 || selectedConversations.length > 0;

  const handleSentMessage = () => {
    if (isReadyForTweetShare && tweet?._id) {
      const payload: any = {
        tweetId: tweet._id,
        selectedUsers: selectedUsers,
        selectedConversations: selectedConversations,
      }
      if (messageContent.length > 0) {
        payload.messageContent = messageContent;
      }

      mutate(payload);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <div className="flex flex-col w-full border-t bg-white">
      {isLoading && <div className="loader w-full" />}
      <div className="flex flex-row items-center mx-3 my-1 mt-2 p-1 rounded-2xl bg-gray-message">
        <MessageTextInput
          placeholder="Add a comment"
          messageContent={messageContent}
          isDisabled={!isReadyForTweetShare || isLoading}
          setMessageContent={setMessageContent}
        />
        <SendButton
          isTweetShare={true}
          isReadyForTweetShare={isReadyForTweetShare && !isLoading}
          messageContent={messageContent}
          handleSentMessage={handleSentMessage}
        />
      </div>
    </div>
  );
};

export default Composer;
