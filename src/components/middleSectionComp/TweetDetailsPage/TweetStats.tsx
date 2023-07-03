import { formatDetailedDate } from "@utils/formatDetailedDate";
import { getSpecificTweetStats } from "api/tweetApi";
import { formatNumber } from "@utils/formatNumber";
import { TweetStatsModal } from "../DialogModals";
import { ITweet } from "@customTypes/TweetTypes";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "redux/config/store";
import { useSelector } from "react-redux";

import { useState } from "react";

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
};

type IProps = {
  tweet: ITweet;
};

const TweetStats = ({ tweet }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);

  const [retweetersModal, setShowRetweetersModal] = useState(false);
  const [likersModal, setShowLikersModal] = useState(false);

  const tweetStats = useQuery<tweetStats>({
    queryKey: ["tweetStats", tweet._id],
    queryFn: () => getSpecificTweetStats(tweet._id),
  });

  return (
    <div>
      {retweetersModal && (
        <TweetStatsModal.RetweetersModal
          tweetId={tweet._id}
          reduxUser={reduxUser}
          isOpen={retweetersModal}
          onClose={() => setShowRetweetersModal(false)}
        />
      )}

      {likersModal && (
        <TweetStatsModal.LikersModal
          tweetId={tweet._id}
          reduxUser={reduxUser}
          isOpen={likersModal}
          onClose={() => setShowLikersModal(false)}
        />
      )}

      <div className="relative my-4">
        <div className="flex flex-row justify-between items-center">
          <div>
            <span className="mr-2">{formatDetailedDate(tweet.createdAt)}</span>
            <span className="font-bold text-black">
              {formatNumber(tweet.view)}
            </span>
            <span className="text-gray-500 text-base ml-1">Views</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row border-t border-b min-w-full">
        <div className="mr-5 py-4">
          <button
            onClick={() => setShowRetweetersModal(true)}
            className="flex gap-2 hover:underline decoration-1 text-gray-500"
          >
            <span className="font-bold text-black">
              {formatNumber(tweetStats.data?.retweetStats.length!)}
            </span>
            <span>Retweets</span>
          </button>
        </div>

        <a
          href={`/${tweet.author.username}/status/${tweet._id}/retweets/with_comments`}
          className="mr-5 py-4"
        >
          <button className="flex gap-2 hover:underline decoration-1 text-gray-500">
            <span className="font-bold text-black">
              {formatNumber(tweetStats.data?.quoteStats.length!)}
            </span>
            <span>Quotes</span>
          </button>
        </a>

        <div className="mr-5 py-4">
          <button
            onClick={() => setShowLikersModal(true)}
            className="flex gap-2 hover:underline decoration-1 text-gray-500"
          >
            <span className="font-bold text-black">
              {formatNumber(tweetStats.data?.likeStats.length!)}
            </span>
            <span> Likes</span>
          </button>
        </div>

        <div className="mr-5 py-4">
          <div className="flex gap-2 text-gray-500">
            <span className="font-bold text-black">
              {formatNumber(tweet?.bookmarks!.length)}
            </span>
            <span>Bookmarks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetStats;
