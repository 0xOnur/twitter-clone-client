import {
  AuthorInfo,
  Avatar,
  TweetContent,
  TweetActions,
} from "@components/middleSectionComp/TweetCard/components";
import { ITweet } from "@customTypes/TweetTypes";
import { useNavigate } from "react-router-dom";

import TweetCard from "../TweetCard";

interface IProps {
  tweet: ITweet;
  isAuthenticated: boolean;
}

const Quote = ({ tweet, isAuthenticated }: IProps) => {
  const navigate = useNavigate();

  const navigateTweetDetails = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  return (
    <article
      onClick={navigateTweetDetails}
      className="cursor-pointer  hover:bg-gray-tweetHover duration-200"
    >
      <div className="px-4 min-w-fit">
        <div className="flex flex-col pt-2">
          <div className="flex flex-row">
            <Avatar
              avatar={tweet.author.avatar!}
              username={tweet.author.username}
            />

            <div className="flex flex-col flex-grow pb-3">
              <AuthorInfo
                pageType="home"
                username={tweet.author.username}
                displayName={tweet.author.displayName}
                isVerified={tweet.author.isVerified}
                createdAt={tweet.createdAt}
              />
              {tweet.content && <TweetContent tweet={tweet} pageType="home" />}

              <div className="border-2 shadow-md rounded-2xl overflow-hidden">
                <TweetCard
                  tweetId={tweet?.originalTweet!}
                  pageType="home"
                  hideActions={true}
                  isAuthenticated={isAuthenticated}
                />
              </div>

              <TweetActions
                pageType={"home"}
                tweet={tweet}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Quote;
