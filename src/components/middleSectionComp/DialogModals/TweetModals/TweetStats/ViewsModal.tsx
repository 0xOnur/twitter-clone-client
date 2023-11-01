import React from "react";

interface IProps {
  closeModal: () => void;
}

const ViewsModal = ({ closeModal }: IProps) => {
  return (
    <div className="z-10 max-w-600px w-full rounded-xl overflow-hidden bg-[color:var(--background-primary)]">
      <div className="flex w-full justify-center overflow-y-auto max-h-90vh">
        <div className="flex flex-col w-full max-w-[400px] m-8">
          <h1 className="font-bold leading-8 text-[26px] mb-2">Views</h1>

          <span className="break-words text-[15px] leading-5">
            Times this post was seen. To learn more, visit the{" "}
            <a
              className="font-bold underline"
              href="https://help.twitter.com/using-twitter/view-counts"
            >
              Help Center
            </a>
          </span>

          <div className="flex flex-col my-6">
            <button
              tabIndex={0}
              onClick={closeModal}
              className="flex items-center h-[44px] rounded-full bg-[color:var(--color-primary)] hover:opacity-80 duration-200"
            >
              <div className="flex grow justify-center items-center">
                <span className="font-bold leading-5 text-[15px] text-white">
                  Dismiss
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewsModal;
