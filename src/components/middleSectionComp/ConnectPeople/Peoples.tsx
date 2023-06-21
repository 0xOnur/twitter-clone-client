import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer'
import { whoToFollow } from "api/userApi";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { IUser } from "@customTypes/UserTypes";
import { FollowsButton } from "@components/middleSectionComp/UserProfile";
import { LoadingIcon, RetryIcon, VerifiedIcon } from "@icons/Icon";

const Peoples = () => {
  const navigate = useNavigate();
  const reduxUser = useSelector((state: RootState) => state.user);
  const { ref, inView } = useInView()

  const fetchConnectPeople = ({ pageParam = 0 }) => {
    return whoToFollow(20, pageParam);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["connectPeople"], fetchConnectPeople, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages - 1) {
        return lastPage.page + 1;
      }
      return false;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(()=> {
    if(inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage])

  if (status === "loading") {
    return (
      <div className="flex w-full mt-20 items-center justify-center">
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
      <div>
        <div className="p-3">
          <span className="text-xl leading-6 font-extrabold">Suggested for you</span>
        </div>
        {data.pages.map((page, index) => (
          <div key={index}>
            {page.data.map((user: IUser) => (
                <div
                  key={user._id}
                  onClick={() => navigate(`/${user.username}`)}
                  className="cursor-pointer py-3 px-4 hover:bg-gray-tweetHover duration-200"
                >
                  <div className="flex flex-row ">
                    <Avatar avatar={user.avatar!} username={user.username} />

                    <div className="flex flex-col w-full">
                      <div className="flex flex-row w-full justify-between items-center">
                        <div className="flex flex-col text-left">
                          <span className="flex items-center gap-1 font-bold">
                            {user.displayName}
                            {user.isVerified && (
                              <VerifiedIcon className="w-5 h-5 mt-1 text-primary-base" />
                            )}
                          </span>
                          <span className="">@{user.username}</span>
                        </div>
                        <div>
                          <FollowsButton user={user} reduxUser={reduxUser} />
                        </div>
                      </div>

                      <div className="text-left pt-1">
                        <span className="whitespace-pre-line">{user.bio}</span>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        ))}
        {isFetchingNextPage && (
          <div className="flex w-full mt-20 items-center justify-center">
            <LoadingIcon />
          </div>
        )}

        <div ref={ref}></div>
      </div>
    );
  }

  return null;
};

export default Peoples;
