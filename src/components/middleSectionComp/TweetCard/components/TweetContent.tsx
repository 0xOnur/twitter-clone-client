import React from "react";
import { ITweet } from "@customTypes/TweetTypes";
import TweetMedia from "./TweetMedia";
import classNames from "classnames";

type Props = {
    tweet: ITweet
    pageType: "home" | "TweetDetails";
}

const TweetContent = ({tweet, pageType}:Props) => {

  const contentAreaClasses = classNames({
    "mt-3": pageType === "TweetDetails",
  })

  const contentTextClasses = classNames({
    "text-[23px] leading-7": pageType === "TweetDetails"

  })

  return (
    <div className={contentAreaClasses}>
      <div>
        {tweet?.content!.length > 280 ? (
          <>
            {tweet?.content!.slice(0, 280)}...
            <a
              className="text-primary-base"
              href={`/${tweet.author.username}/status/${tweet._id}`}
            >
              Show More
            </a>
          </>
        ) : (
          <span className={contentTextClasses}>
            {tweet?.content!.split("\n").map((text, index) => (
              <span key={index}>
                {text}
                <br />
                </span>
            ))}
          </span>
        )}
      </div>

      {tweet.media && (
        <TweetMedia tweet={tweet} />
      )}
    </div>
  );
};

export default TweetContent;
