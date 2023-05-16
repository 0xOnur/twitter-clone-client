import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserTweets } from "api/tweetApi";
import { ITweet } from "@customTypes/TweetTypes";
import { LoadingIcon } from "@icons/Icon";
import TweetCard from "@components/middleSectionComp/TweetCard";

interface IProps {
  username: string;
}

const Tweets = ({ username }: IProps) => {
  const userTweetQuery = useQuery<ITweet[]>({
    queryKey: ["userTweets", username],
    queryFn: () => getUserTweets(username),
    retry: false,
  });

  if (userTweetQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingIcon />
      </div>
    );
  }

  if (userTweetQuery.data) {
    return (
      <div>
        {userTweetQuery.data.map((tweet, index) => (
          <TweetCard
            key={index}
            isAuthenticated={true}
            pageType="home"
            tweet={tweet}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-96">
      <span className="text-2xl font-bold text-gray-500">No Tweets Yet</span>
    </div>
  );
};

export default React.memo(Tweets);
