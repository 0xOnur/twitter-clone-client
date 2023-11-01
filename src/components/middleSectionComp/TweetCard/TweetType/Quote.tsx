import Poll from "@components/middleSectionComp/TweetCard/components/Poll";
import { TweetCard } from "@components/middleSectionComp/TweetCard";
import {
  AuthorInfo,
  Avatar,
  TweetContent,
  TweetActions,
  TweetMedia,
} from "@components/middleSectionComp/TweetCard/components";
import { useNavigate } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  tweet: ITweet;
  isReply?: boolean;
  hideActions?: boolean;
}

const Quote = ({ tweet, isAuthenticated, isReply, hideActions }: IProps) => {
  const navigate = useNavigate();

  const navigateTweetDetails = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  return (
    <article
      onClick={navigateTweetDetails}
      className="cursor-pointer relative group/tweet"
    >
      <div className="absolute w-full h-full -z-10 opacity-40 group-hover/tweet:bg-[color:var(--background-third)] duration-200" />
      <div className="flex flex-row pt-3 px-4">
        {isReply ? (
          <div className="flex flex-col justify-center items-center">
            <Avatar
              avatar={tweet.author.avatar!}
              href={`/${tweet.author.username}`}
            />
            <div className="w-[2px] -ml-3 mt-1 h-full bg-[color:var(--color-base-secondary)] opacity-30" />
          </div>
        ) : (
          <Avatar
            avatar={tweet.author.avatar!}
            href={`/${tweet.author.username}`}
          />
        )}

        <div className="flex flex-col flex-grow pb-3">
          <AuthorInfo
            isAuthenticated={isAuthenticated}
            tweet={tweet}
            pageType="home"
          />

          <TweetContent tweet={tweet} pageType="home" />
          <TweetMedia tweet={tweet} />

          {tweet?.pollId && (
            <Poll isAuthenticated={isAuthenticated} pollId={tweet.pollId} />
          )}

          <div className="relative group/quoted overflow-hidden rounded-xl shadow-box">
            <div className="absolute w-full h-full -z-10 opacity-10 group-hover/quoted:bg-[color:var(--color-secondary)] duration-200" />
            <TweetCard
              tweetId={tweet?.originalTweet!}
              pageType="home"
              hideActions={true}
              isAuthenticated={isAuthenticated}
            />
          </div>

          {!hideActions && (
            <TweetActions
              isAuthenticated={isAuthenticated}
              pageType={"home"}
              tweet={tweet}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default Quote;
