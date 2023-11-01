import MoreMenu from "@components/middleSectionComp/TweetCard/components/MoreMenu";
import { VerifiedIcon } from "@icons/Icon";
import { formatDate } from "@utils/index";
import classNames from "classnames";

interface IProps {
  isAuthenticated?: boolean;
  tweet: ITweet;
  pageType: "home" | "TweetDetails";
  hideMore?:boolean;
}

const AuthorInfo = ({ isAuthenticated, tweet, pageType, hideMore }: IProps) => {
  const userFlexClasses = classNames("grid pr-5", {
    "grid-cols-[auto,auto]": pageType === "home",
    "grid-rows-2": pageType === "TweetDetails",
  });

  const displayNameClassNames = classNames("grid gap-1 items-center pr-1", {
    "grid-cols-[auto,1fr]": tweet.author.isVerified,
    "grid-cols-[1fr]": !tweet.author.isVerified,
  })

  return (
    <div className="flex relative w-full">
      <div className="flex flex-row w-full justify-between items-center">
        <div className={userFlexClasses}>
          <div className={displayNameClassNames}>
            <a
              href={`/${tweet.author.username}`}
              onClick={(e) => e.stopPropagation()}
              className="truncate font-bold cursor-pointer hover:underline duration-200"
            >
              {tweet.author.displayName}
            </a>
            <span>
              {tweet.author.isVerified && (
                <VerifiedIcon className="w-5 h-5 mt-1 text-[color:var(--color-primary)]" />
              )}
            </span>
          </div>
          {pageType === "home" ? (
            <div className="grid grid-cols-[1fr,auto] gap-1 min-w-fit">
              <a
                href={`/${tweet.author.username}`}
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer truncate text-[color:var(--color-base-secondary)]"
              >
                @{tweet.author.username} -
              </a>
              <span className="text-[color:var(--color-base-secondary)] line-clamp-1">
                {formatDate(tweet.createdAt)}
              </span>
            </div>
          ) : (
            <a
              href={`/${tweet.author.username}`}
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer truncate text-[color:var(--color-base-secondary)]"
            >
              @{tweet.author.username}
            </a>
          )}
        </div>
        
        {!hideMore && (
          <MoreMenu isAuthenticated={isAuthenticated} tweet={tweet} />
        )}
      </div>
    </div>
  );
};

export default AuthorInfo;
