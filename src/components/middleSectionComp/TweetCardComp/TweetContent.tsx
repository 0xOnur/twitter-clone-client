import React from "react";
import { TweetProps } from "@customTypes/TweetTypes";

type Props = {
    tweet: TweetProps
}

const TweetContent = ({tweet}:Props) => {
  return (
    <div>
      {tweet.content.length > 280 ? (
        <>
          {tweet.content.slice(0, 280)}...
          <a
            className="text-primary-base"
            href={`/${tweet.owner.username}/status/${tweet._id}`}
          >
            Show More
          </a>
        </>
      ) : (
        tweet.content
      )}
    </div>
  );
};

export default TweetContent;
