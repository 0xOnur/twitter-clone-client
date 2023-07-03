import { TweetComposer } from "@components/middleSectionComp/ComposerComp";
import { TweetCardComp } from "@components/middleSectionComp";
import { ITweet } from "@customTypes/TweetTypes";
import React, { useEffect } from "react";
import { CancelIcon } from "@icons/Icon";


interface IProps {
  isOpen: boolean;
  tweet: ITweet;
  composerMode: "reply" | "quote";
  onClose: () => void;
}

const ReplyQuoteModal = ({ isOpen, onClose, tweet, composerMode }: IProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed cursor-default inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black opacity-60" />

      <div className="z-10 text-black bg-white w-full max-w-600px min-h-400px rounded-xl overflow-hidden">
        <div className="overflow-y-auto max-h-90vh">
          <div className="sticky top-0 z-10">
            <div className="flex flex-row justify-start items-center p-3 bg-white/80  backdrop-blur-md border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="p-3 hover:bg-gray-extraLight rounded-full"
              >
                <CancelIcon className={"w-5 h-5"} />
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-col py-1">
              <div className="flex flex-col px-4">
                <div className="flex flex-row">
                  <div className="flex flex-col grow-0 min-w-fit basis-12 mr-3 items-center">
                    <TweetCardComp.Components.Avatar
                      avatar={tweet.author.avatar!}
                      username={tweet.author.username}
                    />
                    <div className="w-0.5 -ml-3 bg-gray-200 mt-1 h-full"/>
                  </div>
                  <div className="flex flex-col grow">
                    <TweetCardComp.Components.AuthorInfo
                      pageType="home"
                      displayName={tweet.author.displayName}
                      username={tweet.author.username}
                      isVerified={tweet.author.isVerified}
                      createdAt={tweet.createdAt}
                    />
                    <div className="flex flex-col pb-3">
                      <span>{tweet.content}</span>
                      <div>
                        <TweetCardComp.Components.TweetMedia tweet={tweet} />
                      </div>
                    </div>
                    <div>
                      <a href={`/${tweet.author.username}`}>
                        <span>Replying to </span>
                        <span className="text-primary-base">
                          @{tweet.author.username}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full px-4">
                <TweetComposer
                  composerMode={composerMode}
                  originalTweet={tweet}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyQuoteModal;
