import { DigalogModals } from "@components/middleSectionComp";
import { formatNumber } from "@utils/formatNumber";
import { useModal } from "contexts/ModalContext";
import { ReplyIcon } from "@icons/Icon";
import React from "react";

interface IProps {
  isAuthenticated: boolean;
  tweet: ITweet;
  pageType: "home" | "TweetDetails";
  replyStats: {
    _id: string;
    author: string;
  }[];
}

const ReplyAction = ({
  isAuthenticated,
  tweet,
  pageType,
  replyStats,
}: IProps) => {
  const { openModal, closeModal } = useModal();

  const handleReply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isAuthenticated) {
      openModal(
        <DigalogModals.ReplyQuoteModal
          composerMode={"reply"}
          tweet={tweet}
          closeModal={closeModal}
        />
      );
    }
  };

  return (
    <div>
      <button
        title="Reply"
        onClick={handleReply}
        className="group h-5 min-h-max"
      >
        <div className="flex flex-row">
          <div className=" relative text-gray-dark group-hover:text-primary-base duration-150">
            <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0" />
            <ReplyIcon className={"w-5 h-5"} />
          </div>
          <div className="inline-flex  group-hover:text-primary-base">
            <span className="px-3 text-sm">
              {replyStats?.length > 0 &&
                pageType === "home" &&
                formatNumber(replyStats?.length)}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ReplyAction;
