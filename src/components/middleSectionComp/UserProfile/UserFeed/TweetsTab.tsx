import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserTweets } from "api/tweetApi";
import { ITweet } from "@customTypes/TweetTypes";
import { LoadingIcon, RetryIcon } from "@icons/Icon";
import TweetCard from "@components/middleSectionComp/TweetCard";

interface IProps {
  username: string;
}

const TweetsTab = ({ username }: IProps) => {
  const userTweetsQuery = useQuery<ITweet[]>({
    queryKey: ["userTweets", username],
    queryFn: () => getUserTweets(username),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (userTweetsQuery.isLoading) {
    return (
      <div className="flex p-8 justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (userTweetsQuery.isError) {
    return (
      <div className="flex flex-col max-w-600px w-full justify-center items-center py-5 px-3">
        <span className="mb-5 text-center">
          Something went wrong. Try reloading.
        </span>
        <button
          onClick={() => userTweetsQuery.refetch()}
          className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
        >
          <RetryIcon className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Retry</span>
        </button>
      </div>
    );
  }

  if (userTweetsQuery.data.length > 0) {
    return (
      <div className="flex flex-col pb-96">
        {userTweetsQuery.data.map((tweet, index) => (
          <div key={index} className="border-b">
            <TweetCard
              key={index}
              isAuthenticated={true}
              pageType="home"
              tweet={tweet}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex p-8 justify-center">
      <div className="flex flex-col max-w-sm">
        <span className="text-2xl font-bold">@{username} hasn't tweeted</span>
        <span>When they do, their Tweets will show up here.</span>
      </div>
    </div>
  );
};

export default React.memo(TweetsTab);
