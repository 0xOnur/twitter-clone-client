import { TweetCard } from "@components/middleSectionComp/TweetCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { LoadingIcon } from "@icons/Icon";
import { getUserLikes } from "api/userApi";
import React, { useEffect } from "react";
import { RefetchError } from "@components/Others";

interface IProps {
  isAuthenticated: boolean;
  username: string;
}

const LikesTab = ({ isAuthenticated, username }: IProps) => {
  const { ref, inView } = useInView();

  const fetchUserLikes = ({ pageParam = 0 }) => {
    return getUserLikes(username, pageParam, 20);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["userLikes", username], fetchUserLikes, {
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
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "loading") {
    return (
      <div className="flex p-8 justify-center">
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
      <div className="flex flex-col">
        {data.pages.map((page, index) =>
          page.data.length > 0 ? (
            <div key={index}>
              {page.data.map((tweet: ITweet) => (
                <div key={tweet._id} className="border-b-2 border-[color:var(--background-third)] group/like">
                  <TweetCard
                    key={tweet._id}
                    isAuthenticated={isAuthenticated}
                    pageType="home"
                    tweetId={tweet._id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div key={index} className="flex p-8 justify-center">
              <div className="flex flex-col max-w-sm">
                <span className="text-3xl font-bold break-words min-w-0">
                  @{username} hasn't Liked
                </span>
                <span className="text-[color:var(--color-base-secondary)]">When they do, their Likes will show up here.</span>
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

export default LikesTab;
