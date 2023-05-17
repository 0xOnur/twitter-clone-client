import { useQuery } from "@tanstack/react-query";
import { getSpecificTweetStats } from "api/tweetApi";
import { ComposerComp } from "@components/middleSectionComp";
import { ITweet } from "@customTypes/TweetTypes";
import {
  AuthorInfo,
  Avatar,
} from "@components/middleSectionComp/TweetCard/components";
import TweetContent from "./components/TweetContent";
import { TweetStats } from "@components/middleSectionComp/TweetDetailsPage";
import TweetActions from "./components/TweetActions";
import TweetCard from ".";

type tweetStats = {
  replyCount: number;
  retweetCount: number;
  quoteCount: number;
};

interface IProps {
  isAuthenticated: boolean;
  tweet: ITweet;
}

const DetailedCard = ({ tweet, isAuthenticated }: IProps) => {
  const tweetStats = useQuery<tweetStats>({
    queryKey: ["tweetStats", tweet._id],
    queryFn: () => getSpecificTweetStats(tweet._id),
  });

  return (
    <div>
      {tweet.originalTweet && tweet.tweetType === "reply" && (
        <TweetCard
          tweet={tweet.originalTweet}
          pageType="home"
          hideActions={false}
          isReply={true}
          isAuthenticated={isAuthenticated}
        />
      )}
      <article>
        <div className="px-4 min-w-fit border-b">
          <div className="flex flex-col mt-2">
            <div className="flex flex-row">
              <div className="flex flex-col flex-grow pb-3">
                <div className="flex flex-row items-center">
                  <Avatar
                    avatar={tweet.author.avatar!}
                    username={tweet.author.username!}
                  />
                  <AuthorInfo
                    pageType="TweetDetails"
                    username={tweet.author.username}
                    displayName={tweet.author.displayName}
                    isVerified={tweet.author.isVerified}
                    createdAt={tweet.createdAt}
                  />
                </div>

                <TweetContent tweet={tweet} pageType="TweetDetails" />

                {tweet.originalTweet && tweet.tweetType === "quote" && (
                  <div className="border-2 shadow-md rounded-3xl overflow-hidden">
                    <TweetCard
                      tweet={tweet.originalTweet}
                      pageType="home"
                      hideActions={true}
                      isAuthenticated={isAuthenticated}
                    />
                  </div>
                )}

                {tweetStats && (
                  <TweetStats
                    tweet={tweet}
                    retweetCount={tweetStats.data?.retweetCount}
                    quoteCount={tweetStats.data?.quoteCount}
                  />
                )}

                <TweetActions
                  pageType="TweetDetails"
                  tweet={tweet}
                  replyCount={tweetStats.data?.replyCount}
                  retweetCount={tweetStats.data?.retweetCount}
                  isAuthenticated={isAuthenticated}
                />

                {isAuthenticated && (
                  <div className="flex flex-row">
                    <div className="w-14"></div>
                    <a href={`/${tweet.author.username}`}>
                      <span>Replying to </span>
                      <span className="text-primary-base">
                        @{tweet.author.username}
                      </span>
                    </a>
                  </div>
                )}

                {isAuthenticated && (
                  <ComposerComp.TweetComposer
                    composerMode={"reply"}
                    originalTweet={tweet}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DetailedCard;
