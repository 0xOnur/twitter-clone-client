import { UserPreviewCard } from "@components/middleSectionComp/UserProfile";
import { LoadingIcon, CancelIcon } from "@icons/Icon";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { UserState } from "@redux/slices/userSlice";
import { getRetweeters } from "api/tweetApi";
import { RefetchError } from "@components/Others";

interface IProps {
  tweetId: string;
  reduxUser: UserState & PersistPartial;
  onClose: () => void;
}

const RetweetersModal = ({ tweetId, reduxUser, onClose }: IProps) => {
  const { ref, inView } = useInView();

  const fetchRetweeters = ({ pageParam = 0 }) => {
    return getRetweeters(tweetId, pageParam, 20);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["retweeters", tweetId], fetchRetweeters, {
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

  return (
    <div className="z-10 bg-[color:var(--background-primary)] w-full max-w-600px rounded-xl overflow-hidden">
      <div className="overflow-y-auto max-h-90vh">
        <div className="sticky top-0 z-20">
          <div className="bg-[color:var(--background-primary-alpha)] backdrop-blur-md">
            <div className="flex flex-row h-[53px] items-center gap-3 mx-2">
              <button
                title="Close"
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-[color:var(--background-third)] rounded-full"
              >
                <CancelIcon className={"w-5 h-5"} />
              </button>
              <div>
                <span className="text-xl leading-6 font-bold">
                  <h2>Retweets</h2>
                </span>
              </div>
            </div>
          </div>
        </div>

        {status === "loading" && (
          <div className="flex w-full my-20 items-center justify-center">
            <LoadingIcon />
          </div>
        )}

        {status === "error" && <RefetchError refetch={refetch} />}

        {data &&
          data.pages.map((page, index) =>
            page.data.length > 0 ? (
              <div key={index}>
                {page.data.map((user: IUser) => (
                  <UserPreviewCard
                    key={user._id}
                    user={user}
                    reduxUser={reduxUser}
                    showBio={true}
                  />
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
                    Amplify Tweets you like
                  </span>
                  <span>
                    Share someone else’s Tweet on your timeline by Retweeting
                    it. When you do, it’ll show up here.
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
    </div>
  );
};

export default RetweetersModal;
