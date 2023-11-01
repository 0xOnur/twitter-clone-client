import classNames from "classnames";

type Props = {
  tweet: ITweet;
  pageType: "home" | "TweetDetails";
};

const TweetContent = ({ tweet, pageType }: Props) => {
  const contentAreaClasses = classNames(
    "grid break-words min-w-0 overflow-hidden",
    {
      "mt-3": pageType === "TweetDetails",
    }
  );

  const contentTextClasses = classNames("whitespace-pre-line truncate", {
    "text-[23px] leading-7": pageType === "TweetDetails",
  });

  return (
    <div className={contentAreaClasses}>
      {tweet.content && tweet.content.length > 150 && pageType === "home" ? (
        <>
          <span className={contentTextClasses}>
            {tweet?.content!.slice(0, 150)}...
          </span>
          <button className="flex ml-1 text-[color:var(--color-primary)] hover:underline">
            Show More
          </button>
        </>
      ) : (
        <span className={contentTextClasses}>{tweet?.content}</span>
      )}
    </div>
  );
};

export default TweetContent;
