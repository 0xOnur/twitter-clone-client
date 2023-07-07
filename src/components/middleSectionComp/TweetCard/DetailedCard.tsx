import { TweetStats } from "@components/middleSectionComp/TweetDetailsPage";
import { ComposerComp } from "@components/middleSectionComp";
import {
  AuthorInfo,
  Avatar,
  TweetMedia,
} from "@components/middleSectionComp/TweetCard/components";
import { ITweet } from "@customTypes/TweetTypes";
import TweetContent from "./components/TweetContent";
import TweetActions from "./components/TweetActions";
import TweetCard from "./TweetCard";

interface IProps {
  isAuthenticated: boolean;
  tweet: ITweet;
}

const DetailedCard = ({ tweet, isAuthenticated }: IProps) => {
  return (
    <div>
      {tweet.originalTweet && tweet.tweetType === "reply" && (
        <TweetCard
          tweetId={tweet.originalTweet}
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
              <div className="flex flex-col flex-grow">
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

                <TweetMedia tweet={tweet} />

                {tweet.originalTweet && tweet.tweetType === "quote" && (
                  <div className="border-2 shadow-md rounded-3xl overflow-hidden">
                    <TweetCard
                      tweetId={tweet.originalTweet}
                      pageType="home"
                      hideActions={true}
                      isAuthenticated={isAuthenticated}
                    />
                  </div>
                )}

                <TweetStats tweet={tweet} />

                <TweetActions
                  pageType="TweetDetails"
                  tweet={tweet}
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
