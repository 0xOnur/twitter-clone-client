import { TweetCard } from "@components/middleSectionComp/TweetCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { LoadingIcon } from "@icons/Icon";
import { getTweetQuotes } from "api/tweetApi";
import React, { useEffect } from "react";
import { RefetchError } from "@components/Others";

interface IProps {
  isAuthenticated: boolean;
  tweetId: string;
}

const QuoteTweets = ({ isAuthenticated, tweetId }: IProps) => {
  const { ref, inView } = useInView();

  const fetchQuoteTweets = ({ pageParam = 0 }) => {
    return getTweetQuotes(tweetId, pageParam, 20);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["quoteTweets", tweetId], fetchQuoteTweets, {
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
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "loading") {
    return (
      <div className="flex w-full mt-20 items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (status === "error") {
    return (
      <RefetchError refetch={refetch} />
    );
  }

  if (data) {
    return (
      <div>
        {data.pages.map((page, index) =>
          page.data.length > 0 ? (
            <div key={index}>
              {page.data.map((tweet: ITweet) => (
                <div key={tweet._id} className="border-b-2 border-[color:var(--background-third)]">
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
                <img
                  src="https://twitter-clone.fra1.cdn.digitaloceanspaces.com/not-found-images/parrot-400x200.v1.e607e619.png"
                  alt=""
                />
                <span className="text-3xl font-bold mb-2">
                  No Quote Tweets yet
                </span>
                <span className="text-[color:var(--color-base-secondary)]">
                  Add your take when sharing someone else’s Tweet and it’ll show
                  up here.
                </span>
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

export default QuoteTweets;
