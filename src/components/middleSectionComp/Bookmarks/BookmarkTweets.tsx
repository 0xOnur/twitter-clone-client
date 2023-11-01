import { TweetCard } from "@components/middleSectionComp/TweetCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { LoadingIcon } from "@icons/Icon";
import { RootState } from "redux/config/store";
import { getUserBookmarks } from "api/userApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RefetchError } from "@components/Others";

const BookmarkTweets = () => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const { ref, inView } = useInView();

  const fetchBookmarks = ({ pageParam = 0 }) => {
    return getUserBookmarks(pageParam, 20);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["bookmarks"], fetchBookmarks, {
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
                <div
                  key={tweet._id}
                  className="border-b-2 border-[color:var(--background-third)]"
                >
                  <TweetCard
                    pageType="home"
                    tweetId={tweet._id}
                    isAuthenticated={reduxUser.isAuthenticated}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div key={index} className="flex p-8 justify-center">
              <div className="flex flex-col max-w-sm">
                <img
                  src="https://twitter-clone.fra1.cdn.digitaloceanspaces.com/not-found-images/book-in-bird-cage-400x200.v1.366bcfc9.png"
                  alt="book-in-bird-cage"
                />
                <span className="text-3xl font-bold mb-2">
                  Save Tweets for later
                </span>
                <span>
                  Don’t let the good ones fly away! Bookmark Tweets to easily
                  find them again in the future.
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

export default BookmarkTweets;
