import React, {useState} from "react";
import { CancelIcon } from "@icons/Icon";
import { TweetsProps } from "../Tweet";
import { formatDate } from "@utils/formatDate";
import { TweetComposer } from "../ComposerComp";

interface IProps {
  setShowReply: React.Dispatch<React.SetStateAction<boolean>>;
  tweet: TweetsProps;
  composerMode: string;
}

const ReplyModal = ({
  setShowReply,
  tweet,
  composerMode,
}: IProps) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex place-content-start justify-center z-50 overflow-auto">
      <div className="absolute top-80 w-full max-w-xl justify-center">
        <div className="bg-white opacity-100 border rounded-2xl">
          <div className="flex flex-col">
            <div className="flex flex-row h-14 items-center px-4">
              <button
                type="button"
                onClick={() => setShowReply(false)}
                className="p-3 -ml-2 hover:bg-gray-extraLight rounded-full"
              >
                <CancelIcon className={"w-5 h-5"} />
              </button>
            </div>
            <div>
              <div className="flex flex-col py-1">
                <div className="flex flex-col px-4">
                  <div className="flex flex-row">
                    <div className="flex flex-col grow-0 basis-12 mr-3 items-center">
                      <img
                        src={tweet.owner.avatar}
                        alt="profile"
                        className="rounded-full w-12 h-12"
                      />
                      <div className="w-0.5 bg-gray-200 mt-1 h-full"></div>
                    </div>
                    <div className="flex flex-col grow">
                      <div className="flex flex-row mb-2px">
                        <span className="font-bold">{tweet.owner.name}</span>
                        <span className="ml-1">
                          @{tweet.owner.username} -{" "}
                          {formatDate(tweet.createdAt)}
                        </span>
                      </div>
                      <div className="flex flex-col pb-3">
                        <span>{tweet.content}</span>
                        <span>
                          {tweet.images.map((image, index) => (
                            <a href={image.url} key={index}>
                              {image.url}
                            </a>
                          ))}
                        </span>
                      </div>
                      <div>relpying to @realist</div>
                    </div>
                  </div>
                </div>
                <div className="h-full">
                  <TweetComposer
                    composerMode={composerMode}
                    tweet={tweet}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
