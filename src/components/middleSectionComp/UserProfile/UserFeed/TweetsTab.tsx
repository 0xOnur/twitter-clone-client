import {TweetCard} from "@components/middleSectionComp/TweetCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { LoadingIcon, RetryIcon } from "@icons/Icon";
import { ITweet } from "@customTypes/TweetTypes";
import { getUserTweets } from "api/userApi";
import React, { useEffect } from "react";

interface IProps {
  isAuthenticated:boolean;
  username: string;
}

const TweetsTab = ({ isAuthenticated, username }: IProps) => {
  const { ref, inView } = useInView();

  const fetchUserTweets = ({ pageParam = 0 }) => {
    return getUserTweets(username, pageParam, 20);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["userTweets", username], fetchUserTweets, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return false;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage]);

  if (status === "loading") {
    return (
      <div className="flex p-8 justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (status === "error") {
    return (
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
    );
  }

  if (data) {
    return (
      <div className="flex flex-col">
        {data.pages.map((page, index) =>
          page.data.length > 0 ? (
            <div key={index}>
              {page.data.map((tweet: ITweet) => (
                <div key={tweet._id} className="border-b">
                  <TweetCard
                    isAuthenticated={isAuthenticated}
                    tweetId={tweet._id}
                    key={tweet._id}
                    pageType="home"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div key={index} className="flex p-8 justify-center">
              <div className="flex flex-col max-w-sm">
                <span className="text-3xl font-bold">
                  @{username} hasn't tweeted
                </span>
                <span>When they do, their Tweets will show up here.</span>
              </div>
            </div>
          )
        )}
        {isFetchingNextPage && (
          <div className="flex w-full mt-20 items-center justify-center">
            <LoadingIcon />
          </div>
        )}
        <div ref={ref} className="h-56" />
      </div>
    );
  }

  return null;
};

export default React.memo(TweetsTab);
