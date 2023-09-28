import React, { useState, useEffect } from "react";
import EditGroupHeader from "./Header";
import Avatar from "./ChatAvatarEdit";
import ChatName from "./ChatName";
import useEditGroup from "@hooks/Chat/Mutations/useEditGroup";

interface IProps {
  chat: IChat;
  closeModal: () => void;
}

const EditGroupModal = ({ chat, closeModal }: IProps) => {
  const {mutate, isLoading, isSuccess} = useEditGroup()

  const [chatName, setName] = useState(chat.chatName || "")
  const [chatImage, setImage] = useState({
    avatar: new File([], ""),
    avatarURL: chat.chatImage,
  });

  const isChanges = () => {
    return Boolean(
      (chat.chatName ? chat.chatName !== chatName : chatName !== "") ||
      chatImage.avatarURL !== chat.chatImage
    );
  }

  const handleSave = () => {
    if (isChanges()) {
      const formData = new FormData();
      formData.append("chatId", chat._id);
      formData.append("chatName", chatName);
      formData.append("avatar", chatImage.avatar);
      mutate(formData)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <div className="w-full z-10 border-2 shadow-2xl text-black bg-white max-w-600px rounded-xl overflow-hidden">
      <div className="overflow-y-auto max-h-90vh">
        <div className="flex flex-col">
          <div className="sticky top-0 z-10">
            <EditGroupHeader 
              closeModal={closeModal} 
              handleSave={handleSave} 
              isChanges={isChanges} 
              isLoading={isLoading}
            />
            {isLoading && (
              <div className="loader w-full" />
            )}
          </div>

          <div className="flex flex-col">
              {/* avatar section */}
                <div className="flex w-full items-center justify-center py-5">
                  <Avatar chatImage={chatImage} setImage={setImage} />
                </div>
              {/* chatname section */}
              <div className="flex w-full py-3 px-4">
                <ChatName chatName={chatName} maxLength={50} setName={setName} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGroupModal;
