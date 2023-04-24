import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CancelIcon } from "@icons/Icon";
import { ITweet } from "@customTypes/TweetTypes";
import { TweetComposer } from "@components/middleSectionComp/ComposerComp";
import { TweetCardComp } from "@components/middleSectionComp";

interface IProps {
  isOpen: boolean;
  tweet: ITweet;
  composerMode: string;
  onClose: () => void;
}

const ReplyQuoteModal = ({ isOpen, onClose, tweet, composerMode }: IProps) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog static open={isOpen} onClose={onClose}>
        <div className="fixed flex place-content-start justify-center inset-0 pt-16">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />

          <div className="absolute top-16 w-full max-w-xl justify-center">
            <div className="bg-white opacity-100 border rounded-2xl overflow-hidden">
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
                          <TweetCardComp.Avatar
                            avatar={tweet.author.avatar}
                            username={tweet.author.username}
                          />
                          <div className="w-0.5 -ml-3 bg-gray-200 mt-1 h-full"></div>
                        </div>
                        <div className="flex flex-col grow">
                          <TweetCardComp.AuthorInfo
                            pageType="home"
                            displayName={tweet.author.displayName}
                            username={tweet.author.username}
                            isVerified={tweet.author.isVerified}
                            createdAt={tweet.createdAt}
                          />
                          <div className="flex flex-col pb-3">
                            <span>{tweet.content}</span>
                            <div>
                              <TweetCardComp.TweetMedia tweet={tweet} />
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
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReplyQuoteModal;
