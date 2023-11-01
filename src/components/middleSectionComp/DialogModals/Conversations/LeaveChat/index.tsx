import useDeleteConversation from "@hooks/Chat/Mutations/useDeleteConversation";

interface IProps {
  chatId: string;
  closeModal: () => void;
}

const LeaveChatModal = ({ chatId, closeModal }: IProps) => {
  const { mutate } = useDeleteConversation();

  return (
    <div className="z-10 bg-[color:var(--background-primary)] max-w-600px rounded-xl overflow-hidden">
      <div className="overflow-y-auto max-h-90vh">
        <div className="flex flex-col p-8 max-w-[320px]">
          <h1 className="font-bold leading-6 text-xl mb-2">
            Leave conversation?
          </h1>

          <span className="break-words text-[15px] leading-5 text-[color:var(--color-base-secondary)]">
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
              className="flex items-center min-w-[44px] min-h-[44px] mb-3 whitespace-nowrap rounded-full bg-red-base hover:opacity-80 duration-200"
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
              className="flex border border-gray-500 items-center min-w-[44px] min-h-[44px] mb-3 rounded-full hover:bg-[color:var(--background-third)] duration-200"
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
