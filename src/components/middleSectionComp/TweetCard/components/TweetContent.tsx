import { ITweet } from "@customTypes/TweetTypes";
import classNames from "classnames";

type Props = {
  tweet: ITweet;
  pageType: "home" | "TweetDetails";
};

const TweetContent = ({ tweet, pageType }: Props) => {
  const contentAreaClasses = classNames({
    "mt-3": pageType === "TweetDetails",
  });

  const contentTextClasses = classNames("whitespace-pre-line", {
    "text-[23px] leading-7": pageType === "TweetDetails",
  });

  return (
    <div className={contentAreaClasses}>
      <div>
        {tweet.content && tweet.content.length > 280 && pageType === "home" ? (
          <>
            <span className={contentTextClasses}>
              {tweet?.content!.slice(0, 280)}...
            </span>
            <span className="ml-1 text-primary-base hover:underline">
              Show More
            </span>
          </>
        ) : (
          <span className={contentTextClasses}>{tweet?.content}</span>
        )}
      </div>
    </div>
  );
};

export default TweetContent;
