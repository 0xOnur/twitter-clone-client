import React, { useRef, useEffect, useCallback } from "react";
import { ITweet } from "@customTypes/TweetTypes";
import { RootState } from "@redux/config/store";
import { useSelector } from "react-redux";
import { ListsIcon } from "@icons/Icon";
import FollowItem from "./FollowItem";
import CopyItem from "./CopyItem";
import DeleteItem from "./DeleteItem";

interface IProps {
  isAuthenticated?: boolean;
  tweet: ITweet;
  onClose: () => void;
}

const MoreMenu = ({ isAuthenticated, tweet, onClose }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const reduxUser = useSelector((state: RootState) => state.user);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
  return (
    <div
      ref={menuRef}
      className="absolute z-10 top-0 -right-3 w-max border bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="flex flex-col">
        {isAuthenticated && reduxUser.user?._id !== tweet.author._id && (
          <FollowItem
            user={tweet.author}
            reduxUser={reduxUser}
            onClose={onClose}
          />
        )}

        {reduxUser.user?._id === tweet.author._id && (
          <DeleteItem tweet={tweet} onClose={onClose} />
        )}

        <CopyItem
          tweet={tweet}
          onClose={onClose}
        />

        <button className="flex flex-row cursor-not-allowed hover:bg-gray-lightest font-bold">
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <ListsIcon className={"w-5 h-5"} />
            </div>
            <div>
              <span>Add/remove @{tweet.author.username} from Lists</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MoreMenu;
