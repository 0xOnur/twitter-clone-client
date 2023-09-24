import useDeleteConversation from "@hooks/Chat/Mutations/useDeleteConversation";

interface IProps {
  chatId: string;
  closeModal: () => void;
}

const LeaveChatModal = ({ chatId, closeModal }: IProps) => {
  const { mutate } = useDeleteConversation();

  return (
    <div className="z-10 border-2 shadow-2xl text-black bg-white max-w-600px rounded-xl overflow-hidden">
      <div className="overflow-y-auto max-h-90vh">
        <div className="flex flex-col p-8 max-w-[320px]">
          <h1 className="font-bold leading-6 text-xl mb-2">
            Leave conversation?
          </h1>

          <span className="break-words text-[15px] leading-5">
            This conversation will be deleted from your inbox. Other people in
            the conversation will still be able to see it.
          </span>

          <div className="flex flex-col mt-6">
            <button
              tabIndex={0}
              onClick={() => {
                mutate(chatId);
                closeModal();
              }}
              className="flex items-center min-w-[44px] min-h-[44px] mb-3 whitespace-nowrap rounded-full bg-red-removeText hover:bg-red-600 duration-200"
            >
              <div className="flex grow justify-center items-center">
                <span className="font-bold leading-5 text-[15px] text-white">
                  Leave
                </span>
              </div>
            </button>

            <button
              tabIndex={0}
              onClick={closeModal}
              className="flex border-2 items-center min-w-[44px] min-h-[44px] mb-3 whitespace-nowrap rounded-full hover:bg-slate-200 duration-200"
            >
              <div className="flex grow justify-center items-center">
                <span className="font-bold leading-5 text-[15px]">Cancel</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveChatModal;
