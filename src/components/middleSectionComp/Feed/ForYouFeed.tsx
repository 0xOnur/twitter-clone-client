import { TweetCard } from "@components/middleSectionComp/TweetCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { LoadingIcon } from "@icons/Icon";
import { getPopularTweets } from "api/tweetApi";
import { useEffect } from "react";
import { RefetchError } from "@components/Others";

interface IProps {
  isAuthenticated: boolean;
}

const ForYouFeed = ({ isAuthenticated }: IProps) => {
  const { ref, inView } = useInView();

  const fetchForYou = ({ pageParam = 0 }) => {
    return getPopularTweets(pageParam, 20);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["forYouFeed"], fetchForYou, {
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
        {data.pages.map((page, index) => (
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
        ))}
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

export default ForYouFeed;
