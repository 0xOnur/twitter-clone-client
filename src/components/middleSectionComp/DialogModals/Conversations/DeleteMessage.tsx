import useDeleteMessage from "@hooks/Chat/Mutations/useDeleteMessage";
import { useRef, useEffect, useCallback } from "react";

interface IProps {
  messageId: string;
  closeModal: () => void;
}

const DeleteMessageModal = ({ messageId, closeModal }: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { mutate } = useDeleteMessage();

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    },
    [modalRef, closeModal]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div ref={modalRef} className="fixed inset-0 bg-black opacity-60" />
        <div className="z-10 border-2 shadow-2xl text-black bg-white max-w-600px rounded-xl overflow-hidden">
          <div className="overflow-y-auto max-h-90vh">
            <div className="flex flex-col p-8 max-w-[320px]">
              <h1 className="font-bold leading-6 text-xl mb-2">
                Delete message?
              </h1>

              <span className="break-words text-[15px] leading-5">
                This message will be deleted for you. Other people in the
                conversation will still be able to see it.
              </span>

              <div className="flex flex-col mt-6">
                <button
                  tabIndex={0}
                  onClick={() => {
                    mutate(messageId);
                    closeModal();
                  }}
                  className="flex items-center min-w-[44px] min-h-[44px] mb-3 whitespace-nowrap rounded-full bg-red-removeText hover:bg-red-600 duration-200"
                >
                  <div className="flex grow justify-center items-center">
                    <span className="font-bold leading-5 text-[15px] text-white">
                      Delete
                    </span>
                  </div>
                </button>
                
                <button
                  tabIndex={0}
                  onClick={closeModal}
                  className="flex border-2 items-center min-w-[44px] min-h-[44px] mb-3 whitespace-nowrap rounded-full hover:bg-slate-200 duration-200"
                >
                  <div className="flex grow justify-center items-center">
                    <span className="font-bold leading-5 text-[15px]">
                      Cancel
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMessageModal;
