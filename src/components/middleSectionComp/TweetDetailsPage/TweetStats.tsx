import React from "react";
import { formatDetailedDate } from "@utils/formatDetailedDate";
import { formatNumber } from "@utils/formatNumber";
import { ITweet } from "@customTypes/TweetTypes";

type IProps = {
    tweet: ITweet;
    retweetCount?: number;
    quoteCount?: number;
}

const TweetStats = ({tweet, retweetCount, quoteCount}: IProps) => {
  return (
    <div>
      <div className="relative my-4">
        <div className="flex flex-row justify-between items-center">
          <div>
            <span className="mr-2">{formatDetailedDate(tweet.createdAt)}</span>
            <span className="font-bold text-black">{formatNumber(tweet.view)}</span>
            <span className="text-gray-500 text-base ml-1">Views</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row border-t border-b min-w-full">
          <div className="mr-5 py-4">
            <button className="flex gap-2 hover:underline decoration-1 text-gray-500">
              <span className="font-bold text-black">
                {formatNumber(retweetCount!)}
              </span>
              <span>Retweets</span>
            </button>
          </div>

          <div className="mr-5 py-4">
            <button className="flex gap-2 hover:underline decoration-1 text-gray-500">
              <span className="font-bold text-black">
                {formatNumber(quoteCount!)}
              </span>
              <span>Quotes</span>
            </button>
          </div>

          <div className="mr-5 py-4">
            <button className="flex gap-2 hover:underline decoration-1 text-gray-500">
              <span className="font-bold text-black">
                {formatNumber(tweet?.likes!.length)}
              </span>
              <span> Likes</span>
            </button>
          </div>

          <div className="mr-5 py-4">
            <button className="flex gap-2 hover:underline decoration-1 text-gray-500">
              <span className="font-bold text-black">
                {formatNumber(tweet?.bookmarks!.length)}
              </span>
              <span>Bookmarks</span>
            </button>
          </div>
      </div>
    </div>
  );
};

export default TweetStats;
