import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "@redux/config/store";
import { ITweet } from "@customTypes/TweetTypes";
import ReplyAction from "./ActionComponents/ReplyAction";
import RetweetAction from "./ActionComponents/RetweetAction";
import LikeAction from "./ActionComponents/LikeAction";
import Views from "./ActionComponents/Views";
import ShareAction from "./ActionComponents/ShareAction";
import BookmarkAction from "./ActionComponents/BookmarkAction";

interface Props {
  pageType: "home" | "TweetDetails";
  tweet: ITweet;
  replyStats: {
    _id: string;
    author: string;
  }[];
  retweetStats: {
    _id: string;
    author: string;
  }[];
  quoteStats?: {
    _id: string;
    author: string;
  }[];
  isAuthenticated: boolean;
}

const TweetActions = ({
  tweet,
  replyStats,
  retweetStats,
  pageType,
  isAuthenticated,
}: Props) => {
  const reduxUser = useSelector((state: RootState) => state.user);

  const actionClasses = classNames({
    "flex flex-row justify-between gap-2 mt-3 max-w-md w-full":
      pageType === "home",
    "flex flex-row border-b justify-around gap-2 h-12 items-center mx-1 w-full":
      pageType === "TweetDetails",
  });

  return (
    <div key={tweet._id}>
      <div key={tweet._id} className={actionClasses}>
        <ReplyAction
          isAuthenticated={isAuthenticated}
          tweet={tweet}
          pageType={pageType}
          replyStats={replyStats}
        />

        <RetweetAction
          isAuthenticated={isAuthenticated}
          tweet={tweet}
          pageType={pageType}
          reduxUser={reduxUser}
          retweetStats={retweetStats}
        />

        <LikeAction
          isAuthenticated={isAuthenticated}
          tweet={tweet}
          pageType={pageType}
          reduxUser={reduxUser}
        />

        {pageType === "TweetDetails" && (
          <BookmarkAction />
        )}

        {pageType !== "TweetDetails" && <Views tweet={tweet} />}

        <ShareAction isAuthenticated={isAuthenticated} tweet={tweet} />
      </div>
    </div>
  );
};

export default TweetActions;
