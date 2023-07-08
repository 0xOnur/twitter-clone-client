import { PersistPartial } from "redux-persist/es/persistReducer";
import { useBookmarkMutation } from "@hooks/mutations/useBookmarkMutation";
import { TweetCardComp } from "@components/middleSectionComp";
import { useCopyTweet } from "@hooks/tweet/useCopyTweetURL";
import { UserState } from "@redux/slices/userSlice";
import { ITweet } from "@customTypes/TweetTypes";
import React, { useState } from "react";
import { ShareIcon } from "@icons/Icon";

interface IProps {
  isAuthenticated: boolean;
  reduxUser: UserState & PersistPartial;
  tweet: ITweet;
}

const ShareAction = ({ isAuthenticated, reduxUser, tweet }: IProps) => {
  const { copyTweet } = useCopyTweet(tweet);

  const [shareMenu, setShowShareMenu] = useState(false);

  const { addBookmarkMutation, removeBookmarkMutation } = useBookmarkMutation(
    tweet._id
  );

  const isBookmarked = tweet.bookmarks?.includes(reduxUser.user?._id);

  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isAuthenticated) {
      if (isBookmarked) {
        removeBookmarkMutation.mutate(tweet._id);
      } else {
        addBookmarkMutation.mutate(tweet._id);
      }
    }
    setShowShareMenu(false);
  };

  return (
    <div
      className="group h-5 min-h-max relative"
      role="button"
      onClick={(e) => {
        e.stopPropagation();
        setShowShareMenu(!shareMenu);
      }}
    >
      <div
        title="Share"
        className="flex flex-row group-hover:text-primary-base duration-150"
      >
        <div className="inline-flex relative ">
          <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0 "></div>
          <ShareIcon className={"w-5 h-5"} />
        </div>
      </div>
      {shareMenu && (
        <TweetCardComp.Components.ShareMenu
          isAuthenticated={isAuthenticated}
          isBookmarked={isBookmarked}
          handleCopy={copyTweet}
          handleBookmark={handleBookmark}
          onClose={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default ShareAction;
