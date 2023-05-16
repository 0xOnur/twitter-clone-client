import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getSpecificTweet } from "api/tweetApi";
import { RootState } from "@redux/config/store";
import { HeaderComp } from "@components/middleSectionComp";
import TweetCard from "@components/middleSectionComp/TweetCard/";
import { ITweet } from "@customTypes/index";
import Replies from "./Replies";
import { LoadingIcon } from "@icons/Icon";

const TweetDetails = () => {
  const { tweetId } = useParams<{ tweetId: string }>();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const tweetQuery = useQuery<ITweet>({
    queryKey: ["tweet", tweetId],
    queryFn: () => getSpecificTweet(tweetId!),
  });
  return (
    <div className="container max-w-600px border-x">
      <HeaderComp.Header pageType="TweetDetails" headerTitle="Tweet" />
      {tweetQuery.isLoading && (
        <div className="flex justify-center items-center h-56">
          <LoadingIcon />
        </div>
      )}

      {tweetQuery.isError && (
        <div className="flex justify-center items-center h-56">
          <span className="text-2xl font-bold text-gray-500">
            Something went wrong
          </span>
        </div>
      )}

      {tweetQuery.data && (
        <div>
          <TweetCard
            tweet={tweetQuery.data}
            pageType="TweetDetails"
            isAuthenticated={isAuthenticated}
          />
          <Replies tweetId={tweetId!} />
        </div>
      )}
    </div>
  );
};

export default TweetDetails;
