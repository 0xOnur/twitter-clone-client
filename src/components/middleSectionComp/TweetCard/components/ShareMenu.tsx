import React, { useRef, useEffect, useCallback } from "react";
import {
  CopyTweetIcon,
  MessagesIcon,
  BookmarkPlusIcon,
  ShareIcon,
} from "@icons/Icon";

interface IProps {
  isAuthenticated: boolean;
  isBookmarked?: boolean;
  onClose: () => void;
  handleCopy: () => void;
  handleBookmark: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ShareMenu = ({
  isAuthenticated,
  isBookmarked,
  handleCopy,
  handleBookmark,
  onClose,
}: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

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
      className="absolute z-10 -top-2 -right-3 w-max border bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="flex flex-col">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
            onClose();
          }}
          className="flex flex-row  hover:bg-gray-lightest font-bold"
        >
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <CopyTweetIcon className={"w-5 h-5"} />
            </div>
            <div>
              <span>Copy link to Tweet</span>
            </div>
          </div>
        </button>

        <button className="flex flex-row cursor-not-allowed hover:bg-gray-lightest font-bold">
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
          <button className="flex flex-row cursor-not-allowed hover:bg-gray-lightest font-bold">
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
          <button
            onClick={handleBookmark}
            className="flex flex-row hover:bg-gray-lightest font-bold"
          >
            <div className="flex flex-row py-3 px-4 items-center">
              <div className="mr-2">
                <BookmarkPlusIcon className={"w-5 h-5"} />
              </div>
              <div>
                {isBookmarked ? (
                  <span>Remove Tweet from Bookmarks</span>
                ) : (
                  <span>Bookmark</span>
                )}
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareMenu;
