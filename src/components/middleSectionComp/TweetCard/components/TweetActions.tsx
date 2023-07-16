import BookmarkAction from "./ActionComponents/BookmarkAction";
import RetweetAction from "./ActionComponents/RetweetAction";
import ReplyAction from "./ActionComponents/ReplyAction";
import ShareAction from "./ActionComponents/ShareAction";
import LikeAction from "./ActionComponents/LikeAction";
import { getSpecificTweetStats } from "api/tweetApi";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@redux/config/store";
import Views from "./ActionComponents/Views";
import { useSelector } from "react-redux";
import classNames from "classnames";

type tweetStats = {
  replyStats: {
    _id: string;
    author: string;
  }[];
  retweetStats: {
    _id: string;
    author: string;
  }[];
  likeStats: {
    _id: string;
    author: string;
  }[];
  quoteStats: {
    _id: string;
    author: string;
  }[];
}

interface Props {
  isAuthenticated: boolean;
  tweet: ITweet;
  pageType: "home" | "TweetDetails";
}

const TweetActions = ({
  isAuthenticated,
  tweet,
  pageType,
}: Props) => {
  const reduxUser = useSelector((state: RootState) => state.user);

  const tweetStats = useQuery<tweetStats>({
    queryKey: ["tweetStats", tweet._id],
    queryFn: () => getSpecificTweetStats(tweet._id),
  });

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
          replyStats={tweetStats.data?.replyStats!}
        />

        <RetweetAction
          isAuthenticated={isAuthenticated}
          tweet={tweet}
          pageType={pageType}
          reduxUser={reduxUser}
          retweetStats={tweetStats.data?.retweetStats!}
        />

        <LikeAction
          isAuthenticated={isAuthenticated}
          tweet={tweet}
          pageType={pageType}
          reduxUser={reduxUser}
          likeStats={tweetStats.data?.likeStats!}
        />

        {pageType === "TweetDetails" && (
          <BookmarkAction
            isAuthenticated={isAuthenticated}
            reduxUser={reduxUser}
            tweet={tweet}
          />
        )}

        {pageType !== "TweetDetails" && <Views tweet={tweet} />}

        <ShareAction
          isAuthenticated={isAuthenticated}
          reduxUser={reduxUser}
          tweet={tweet}
        />
      </div>
    </div>
  );
};

export default TweetActions;
