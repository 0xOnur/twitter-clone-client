import Poll from "@components/middleSectionComp/TweetCard/components/Poll";
import {TweetCard} from "@components/middleSectionComp/TweetCard";
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
      className="cursor-pointer hover:bg-gray-tweetHover duration-200"
    >
      <div className="px-4 min-w-fit">
        <div className="flex flex-col pt-2">
          <div className="flex flex-row">
              {isReply ? (
                <div className="flex flex-col justify-center items-center">
                  <Avatar
                    avatar={tweet.author.avatar!}
                    href={`/${tweet.author.username}`}
                  />
                  <div className="w-px -ml-3 bg-gray-200 mt-1 h-full" />
                </div>
              ) : (
                <Avatar
                  avatar={tweet.author.avatar!}
                  href={`/${tweet.author.username}`}
                />
              )}

            <div className="flex flex-col flex-grow pb-3">
              <AuthorInfo
                isAuthenticated ={isAuthenticated}
                tweet={tweet}
                pageType="home"
              />
              
              <TweetContent tweet={tweet} pageType="home" />
              <TweetMedia tweet={tweet} />

              {tweet?.pollId && (
                  <Poll isAuthenticated={isAuthenticated} pollId={tweet.pollId} />
                )}

              <div className="border-2 shadow-md rounded-2xl overflow-hidden">
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
        </div>
      </div>
    </article>
  );
};

export default Quote;
