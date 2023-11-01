import { TweetModals } from "@components/middleSectionComp/DialogModals/";
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
        <TweetModals.ReplyQuoteModal
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
          <div className="relative">
            <div className="absolute top-0 right-0 left-0 bottom-0 -m-2 group-hover:bg-blue-base/30 duration-150 rounded-full" />
            <ReplyIcon
              className={
                "w-5 h-5 [color:var(--color-base-secondary)] group-hover:fill-blue-base"
              }
            />
          </div>
          {replyStats?.length > 0 && pageType === "home" && (
            <div className="inline-flex">
              <span className="px-3 text-sm text-[color:var(--color-base-secondary)] group-hover:text-blue-base">
                {formatNumber(replyStats?.length)}
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default ReplyAction;
