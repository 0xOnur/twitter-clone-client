import { TweetStats } from "@components/middleSectionComp/TweetDetailsPage";
import Poll from "@components/middleSectionComp/TweetCard/components/Poll";
import { ComposerComp } from "@components/middleSectionComp";
import {
  AuthorInfo,
  Avatar,
  TweetMedia,
} from "@components/middleSectionComp/TweetCard/components";
import TweetContent from "./components/TweetContent";
import TweetActions from "./components/TweetActions";
import TweetCard from "./TweetCard";
import ReplyTo from "./components/Other/ReplyTo";

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
        <div className="flex px-4 min-w-fit border-b-2 border-[color:var(--background-third)]">
              <div className="grid w-full mt-2">
                <div className="flex flex-row items-center">
                  <Avatar
                    avatar={tweet.author.avatar!}
                    href={`/${tweet.author.username!}`}
                  />
                  <AuthorInfo
                    isAuthenticated={isAuthenticated}
                    pageType="TweetDetails"
                    tweet={tweet}
                  />
                </div>
                
      
                <TweetContent tweet={tweet} pageType="TweetDetails" />

                <TweetMedia tweet={tweet} />

                {tweet?.pollId && (
                  <Poll
                    isAuthenticated={isAuthenticated}
                    pollId={tweet.pollId}
                  />
                )}

                {tweet.originalTweet && tweet.tweetType === "quote" && (
                  <div className="overflow-hidden shadow-box rounded-xl">
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

                <div className="my-2 h-0.5 bg-[color:var(--background-third)]" />

                {isAuthenticated && (
                  <div className="ml-14">
                    <ReplyTo
                      username={tweet.author.username}
                      url={`/${tweet.author.username}`}
                    />
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
      </article>
    </div>
  );
};

export default DetailedCard;
