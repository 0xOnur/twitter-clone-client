import React from "react";
import { formatDetailedDate } from "@utils/formatDetailedDate";
import { formatNumber } from "@utils/formatNumber";
import { TweetProps } from "@customTypes/TweetTypes";

type IProps = {
    tweet: TweetProps;
}

const TweetStats = ({tweet}: IProps) => {
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
      <div className="flex flex-row border-t border-b">
        {tweet.retweets && (
          <div className="mr-5 py-4">
            <button className="hover:underline decoration-1 text-gray-500">
              <span className="font-bold text-black">
                {formatNumber(tweet?.retweets!.length)}
              </span>
              <span className=""> Retweets</span>
            </button>
          </div>
        )}

        {tweet.quoteTweets && (
          <div className="mr-5 py-4">
            <button className="hover:underline decoration-1 text-gray-500">
              <span className="font-bold text-black">
                {formatNumber(tweet?.quoteTweets!.length)}
              </span>
              <span className=""> Quotes</span>
            </button>
          </div>
        )}

        {tweet.likes && (
          <div className="mr-5 py-4">
            <button className="hover:underline decoration-1 text-gray-500">
              <span className="font-bold text-black">
                {formatNumber(tweet?.likes!.length)}
              </span>
              <span className=""> Likes</span>
            </button>
          </div>
        )}

        {tweet.bookmarks && (
          <div className="mr-5 py-4">
              <span className="font-bold">
                {formatNumber(tweet?.bookmarks!.length)}
              </span>
              <span className=""> Bookmarks</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetStats;
