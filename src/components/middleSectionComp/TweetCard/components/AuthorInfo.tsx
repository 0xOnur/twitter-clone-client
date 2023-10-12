import MoreMenu from "@components/middleSectionComp/TweetCard/components/MoreMenu";
import { VerifiedIcon } from "@icons/Icon";
import { formatDate } from "@utils/index";
import classNames from "classnames";

interface IProps {
  isAuthenticated?: boolean;
  tweet: ITweet;
  pageType: "home" | "TweetDetails";
}

const AuthorInfo = ({ isAuthenticated, tweet, pageType }: IProps) => {
  const userFlexClasses = classNames("flex", {
    "flex-row items-center": pageType === "home",
    "flex-col": pageType === "TweetDetails",
  });

  return (
    <div className="flex flex-col relative w-full">
      <div className="flex flex-row justify-between items-center">
        <div className={userFlexClasses}>
          <div className="flex flex-row gap-1 items-center pr-1">
            <a
              href={`/${tweet.author.username}`}
              onClick={(e) => e.stopPropagation()}
              className="truncate max-w-[200px] font-bold cursor-pointer hover:underline duration-200"
            >
              {tweet.author.displayName}
            </a>
            <span>
              {tweet.author.isVerified && (
                <VerifiedIcon className="w-5 h-5 mt-1 text-primary-base" />
              )}
            </span>
          </div>
          {pageType === "home" ? (
            <div className="min-w-fit">
              <a
                href={`/${tweet.author.username}`}
                onClick={(e) => e.stopPropagation()}
                className="text-gray-dark cursor-pointer truncate"
              >
                @{tweet.author.username} -{" "}
              </a>
              <span>{formatDate(tweet.createdAt)}</span>
            </div>
          ) : (
            <a
              href={`/${tweet.author.username}`}
              onClick={(e) => e.stopPropagation()}
              className="text-gray-dark cursor-pointer truncate"
            >
              @{tweet.author.username}
            </a>
          )}
        </div>

        <MoreMenu isAuthenticated={isAuthenticated} tweet={tweet} />
      </div>
    </div>
  );
};

export default AuthorInfo;
