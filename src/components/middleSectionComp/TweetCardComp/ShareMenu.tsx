import React, {useRef, useEffect, useCallback} from "react";
import {
  CopyTweetIcon,
  MessagesIcon,
  BookmarkPlusIcon,
  ShareIcon,
} from "@icons/Icon";
import { ITweet } from "@customTypes/TweetTypes";
import useToast from "@hooks/useToast";


interface IProps {
    onClose: () => void;
    tweet: ITweet;
    isAuthenticated: boolean;
}

const ShareMenu = ({onClose, tweet, isAuthenticated}:IProps) => {
  const { showToast } = useToast();
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
        const actionName = e.currentTarget.name;
        
        if(actionName=== "copy") {
          const tweetUrl = window.location.origin + `/${tweet.author.username}/status/${tweet._id}`
          navigator.clipboard.writeText(tweetUrl)
          showToast("Copied to clipboard", "success");
        }

        if(actionName=== "bookmark") {
          console.log(actionName)
        }
        
        onClose();
    }

  return (
    <div ref={menuRef} className="absolute z-10 -top-2 -right-3 w-max border bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col">
        
        <button onClick={handleClick} name="copy" className="flex flex-row  hover:bg-gray-lightest rounded-t-2xl font-bold">
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <CopyTweetIcon className={"w-5 h-5"} />
            </div>
            <div>
              <span>Copy link to Tweet</span>
            </div>
          </div>
        </button>

        <button onClick={handleClick} className="flex flex-row cursor-not-allowed hover:bg-gray-lightest font-bold">
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <ShareIcon className={"w-5 h-5"} />
            </div>
            <div>
              <span>Share Tweet via ...</span>
            </div>
          </div>
        </button>

        {isAuthenticated && (
          <button onClick={handleClick} className="flex flex-row cursor-not-allowed hover:bg-gray-lightest font-bold">
            <div className="flex flex-row py-3 px-4 items-center">
              <div className="mr-2">
                <MessagesIcon isActive={false} className={"w-5 h-5"} />
              </div>
              <div>
                <span>Send via Direct Message</span>
              </div>
            </div>
          </button>
        )}
        
        {isAuthenticated && (
          <button onClick={handleClick} name="bookmark" className="flex flex-row hover:bg-gray-lightest rounded-b-2xl font-bold">
            <div className="flex flex-row py-3 px-4 items-center">
              <div className="mr-2">
                <BookmarkPlusIcon className={"w-5 h-5"} />
              </div>
              <div>
                <span>Bookmark</span>
              </div>
            </div>
          </button>
        )}
        
      </div>
    </div>
  );
};

export default ShareMenu;
