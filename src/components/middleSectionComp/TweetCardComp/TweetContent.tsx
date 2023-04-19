import React from "react";
import { TweetProps } from "@customTypes/TweetTypes";
import TweetMedia from "./TweetMedia";

type Props = {
    tweet: TweetProps
}

const TweetContent = ({tweet}:Props) => {
  return (
    <div>
      <div>
        {tweet.content.length > 280 ? (
          <>
            {tweet.content.slice(0, 280)}...
            <a
              className="text-primary-base"
              href={`/${tweet.author.username}/status/${tweet._id}`}
            >
              Show More
            </a>
          </>
        ) : (
          tweet.content
        )}
      </div>

      {tweet.media && (
        <TweetMedia tweet={tweet} />
      )}
    </div>
  );
};

export default TweetContent;
