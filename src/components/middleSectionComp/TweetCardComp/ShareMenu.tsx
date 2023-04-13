import React, {useRef, useEffect, useCallback, useState} from "react";
import {
  CopyTweetIcon,
  MessagesIcon,
  BookmarkPlusIcon,
  ShareIcon,
} from "@icons/Icon";
import { TweetsProps } from "../Tweet";


interface IProps {
    onClose: () => void;
    tweet: TweetsProps;
}

const ShareMenu: React.FC<IProps> = ({onClose, tweet}) => {

    const menuRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(
        (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        },
        [menuRef, onClose]
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleClose);
        return () => {
            document.removeEventListener("mousedown", handleClose);
        };
    }, [handleClose]);


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const tweetUrl = window.location.origin + `/${tweet.owner.username}/status/${tweet._id}`
        navigator.clipboard.writeText(tweetUrl)
        console.log(tweetUrl)
        onClose();
    }

  return (
    <div ref={menuRef} className="absolute -top-2 -right-3 w-max border bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col">
        
        <button onClick={handleClick} className="flex flex-row  hover:bg-gray-lightest rounded-t-2xl font-bold">
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <CopyTweetIcon className={"w-5 h-5"} />
            </div>
            <div>
              <span>Copy link to Tweet</span>
            </div>
          </div>
        </button>

        <button onClick={handleClick} className="flex flex-row hover:bg-gray-lightest font-bold">
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <ShareIcon className={"w-5 h-5"} />
            </div>
            <div>
              <span>Share Tweet via ...</span>
            </div>
          </div>
        </button>

        <button onClick={handleClick} className="flex flex-row hover:bg-gray-lightest font-bold">
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <MessagesIcon isActive={false} className={"w-5 h-5"} />
            </div>
            <div>
              <span>Send via Direct Message</span>
            </div>
          </div>
        </button>

        <button onClick={handleClick} className="flex flex-row hover:bg-gray-lightest rounded-b-2xl font-bold">
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <BookmarkPlusIcon className={"w-5 h-5"} />
            </div>
            <div>
              <span>Bookmark</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ShareMenu;
