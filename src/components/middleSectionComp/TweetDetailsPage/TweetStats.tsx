import { TweetModals } from "@components/middleSectionComp/DialogModals/"
import { formatDetailedDate } from "@utils/formatDetailedDate";
import { getSpecificTweetStats } from "api/tweetApi";
import { formatNumber } from "@utils/formatNumber";
import { useModal } from "contexts/ModalContext";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "redux/config/store";
import { useSelector } from "react-redux";

type IProps = {
  tweet: ITweet;
};

const TweetStats = ({ tweet }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const { openModal, closeModal } = useModal();

  const handleRetweeters = () => {
    openModal(
      <TweetModals.TweetStatsModal.RetweetersModal
        tweetId={tweet._id}
        reduxUser={reduxUser}
        onClose={closeModal}
      />
    );
  };

  const handleLikers = () => {
    openModal(
      <TweetModals.TweetStatsModal.LikersModal
        tweetId={tweet._id}
        reduxUser={reduxUser}
        onClose={closeModal}
      />
    );
  };

  const tweetStats = useQuery<ITweetStats>({
    queryKey: ["tweetStats", tweet._id],
    queryFn: () => getSpecificTweetStats(tweet._id),
  });

  const isNotAnyStats =
    tweet?.bookmarks?.length === 0 &&
    tweetStats.data?.retweetStats.length === 0 &&
    tweetStats.data?.likeStats.length === 0 &&
    tweetStats.data?.quoteStats.length === 0;

  return (
    <div>
      <div className="relative my-4">
        <div className="flex flex-row gap-1 items-center">
          <span className="text-[color:var(--color-base-secondary)]">
            {formatDetailedDate(tweet.createdAt)}
          </span>
          <span className="text-[color:var(--color-base-secondary)]">·</span>
          <span className="text-[14px] leading-4 font-bold">
            {formatNumber(tweet.view)}
          </span>
          <span className="text-[14px] leading-4 text-[color:var(--color-base-secondary)]">
            Views
          </span>
        </div>
      </div>
      <div className="my-0.5 h-0.5 bg-[color:var(--background-third)]" />

      {!isNotAnyStats && (
        <>
          <div className="flex flex-row gap-5 py-4 min-w-full text-[color:var(--color-base-secondary)]">
            {tweetStats.data?.retweetStats &&
              tweetStats.data?.retweetStats.length > 0 && (
                <div className="hover:underline">
                  <button onClick={handleRetweeters} className="flex gap-2">
                    <span className="font-bold text-[color:var(--color-base)]">
                      {formatNumber(tweetStats.data?.retweetStats.length!)}
                    </span>
                    <span>Retweets</span>
                  </button>
                </div>
              )}

            {tweetStats.data?.quoteStats &&
              tweetStats.data?.quoteStats.length > 0 && (
                <a
                  href={`/${tweet.author.username}/status/${tweet._id}/retweets/with_comments`}
                  className="hover:underline"
                >
                  <button className="flex gap-2">
                    <span className="font-bold text-[color:var(--color-base)]">
                      {formatNumber(tweetStats.data?.quoteStats.length!)}
                    </span>
                    <span>Quotes</span>
                  </button>
                </a>
              )}

            {tweetStats.data?.likeStats &&
              tweetStats.data?.likeStats.length > 0 && (
                <div className="hover:underline">
                  <button onClick={handleLikers} className="flex gap-2">
                    <span className="font-bold text-[color:var(--color-base)]">
                      {formatNumber(tweetStats.data?.likeStats.length!)}
                    </span>
                    <span> Likes</span>
                  </button>
                </div>
              )}

            {tweet.bookmarks && tweet.bookmarks.length > 0 && (
              <div className="flex gap-2">
                <span className="font-bold text-[color:var(--color-base)]">
                  {formatNumber(tweet?.bookmarks!.length)}
                </span>
                <span>Bookmarks</span>
              </div>
            )}
          </div>
          <div className="my-0.5 h-0.5 bg-[color:var(--background-third)]" />
        </>
      )}
    </div>
  );
};

export default TweetStats;
