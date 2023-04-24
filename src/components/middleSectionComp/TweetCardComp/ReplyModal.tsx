import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CancelIcon } from "@icons/Icon";
import { ITweet } from "@customTypes/TweetTypes";
import { formatDate } from "@utils/formatDate";
import { TweetComposer } from "../ComposerComp";
import TweetMedia from "./TweetMedia";

interface IProps {
  isOpen: boolean;
  tweet: ITweet;
  composerMode: string;
  onClose: () => void;
}

const ReplyModal = ({ isOpen, onClose, tweet, composerMode }: IProps) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog static open={isOpen} onClose={onClose}>
        <div className="fixed flex place-content-start justify-center inset-0 pt-16">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />

          <div className="absolute top-16 w-full max-w-xl justify-center">
            <div className="bg-white opacity-100 border rounded-2xl overflow-hidden">
              <div className="flex flex-col max-h-90vh overflow-y-auto">
                <div className="flex flex-row h-14 items-center px-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-3 -ml-2 hover:bg-gray-extraLight rounded-full"
                  >
                    <CancelIcon className={"w-5 h-5"} />
                  </button>
                </div>
                <div>
                  <div className="flex flex-col py-1">
                    <div className="flex flex-col px-4">
                      <div className="flex flex-row">
                        <div className="flex flex-col grow-0 min-w-fit basis-12 mr-3 items-center">
                          <img
                            src={tweet.author.avatar}
                            alt="profile"
                            className="rounded-full w-12 h-12"
                          />
                          <div className="w-0.5 bg-gray-200 mt-1 h-full"></div>
                        </div>
                        <div className="flex flex-col grow">
                          <div className="flex flex-row mb-2px">
                            <span className="font-bold">
                              {tweet.author.displayName}
                            </span>
                            <span className="ml-1">
                              @{tweet.author.username} -{" "}
                              {formatDate(tweet.createdAt)}
                            </span>
                          </div>
                          <div className="flex flex-col pb-3">
                            <span>{tweet.content}</span>
                            <div>
                              <TweetMedia tweet={tweet} />
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

export default ReplyModal;
