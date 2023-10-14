import {TweetCard} from "@components/middleSectionComp/TweetCard";
import { HeaderComp } from "@components/middleSectionComp";
import { LoadingIcon, RetryIcon } from "@icons/Icon";
import { RootState } from "@redux/config/store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Replies from "./Replies";
import useGetTweet from "@hooks/Tweet/Queries/useGetTweet";
import Title from "routes/Title";

const TweetDetails = () => {
  const { tweetId } = useParams<{ tweetId: string }>();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const {tweet, refetch, status} = useGetTweet({tweetId: tweetId!})

  return (
    <div className="container max-w-600px border-x">
      <Title title={`${tweet?.author.displayName} on Twitter`} />
      <HeaderComp.Header pageType="TweetDetails" headerTitle="Tweet" />
      {status === "loading" && (
        <div className="flex justify-center items-center h-56">
          <LoadingIcon />
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col max-w-600px w-full justify-center items-center py-5 px-3">
          <span className="mb-5 text-center">
            Something went wrong. Try reloading.
          </span>
          <button
            onClick={() => refetch()}
            className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
          >
            <RetryIcon className="w-6 h-6 text-white" />
            <span className="font-bold text-white">Retry</span>
          </button>
        </div>
      )}

      {tweet && (
        <div>
          <TweetCard
            tweetId={tweetId!}
            pageType="TweetDetails"
            isAuthenticated={isAuthenticated}
          />
          <Replies isAuthenticated={isAuthenticated} tweetId={tweetId!} />
        </div>
      )}
    </div>
  );
};

export default TweetDetails;
