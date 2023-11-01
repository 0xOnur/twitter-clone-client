import {TweetCard} from "@components/middleSectionComp/TweetCard";
import { HeaderComp } from "@components/middleSectionComp";
import { LoadingIcon } from "@icons/Icon";
import { RootState } from "@redux/config/store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Replies from "./Replies";
import useGetTweet from "@hooks/Tweet/Queries/useGetTweet";
import Title from "routes/Title";
import { RefetchError } from "@components/Others";

const TweetDetails = () => {
  const { tweetId } = useParams<{ tweetId: string }>();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const {tweet, refetch, status} = useGetTweet({tweetId: tweetId!})

  return (
    <div className="container max-w-600px border-x-2 border-[color:var(--background-third)]">
      <Title title={`${tweet?.author.displayName} on Twitter`} />
      <HeaderComp.Header pageType="TweetDetails" headerTitle="Tweet" />
      {status === "loading" && (
        <div className="flex justify-center items-center h-56">
          <LoadingIcon />
        </div>
      )}

      {status === "error" && (
        <RefetchError refetch={refetch} />
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
