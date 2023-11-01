import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";
import { getUserFollowers } from "api/userApi";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingIcon, VerifiedIcon } from "@icons/Icon";
import { FollowsButton } from "@components/middleSectionComp/UserProfile";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { RefetchError } from "@components/Others";

interface IProps {
  isAuthenticated: boolean;
}

const Followers = ({ isAuthenticated }: IProps) => {
  const username = useParams().username;
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const reduxUser = useSelector((state: RootState) => state.user);

  const fetchFollowers = ({ pageParam = 0 }) => {
    return getUserFollowers(username!, pageParam, 20);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["followers", username], fetchFollowers, {
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
      <div className="flex p-8 justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (status === "error") {
    return <RefetchError refetch={refetch} />;
  }

  if (data) {
    return (
      <div>
        {data.pages.map((page, index) =>
          page.data.length > 0 ? (
            <div key={index}>
              {page.data.map((user: IUser) => {
                return (
                  <div key={user._id} className="flex flex-col w-full">
                    <div
                      onClick={() => navigate(`/${user.username}`)}
                      className="cursor-pointer py-3 px-4 hover:bg-[color:var(--background-secondary)] duration-200"
                    >
                      <div className="flex flex-row ">
                        <Avatar avatar={user.avatar!} href={`/${username!}`} />
                        <div className="flex flex-col w-full">
                          <div className="flex flex-row w-full justify-between items-center">
                            <div className="flex flex-col text-left">
                              <span className="flex items-center gap-1 font-bold">
                                {user.displayName}
                                {user.isVerified && (
                                  <VerifiedIcon className="w-5 h-5 mt-1 text-[color:var(--color-primary)]" />
                                )}
                              </span>
                              <span className="">@{user.username}</span>
                            </div>
                            {isAuthenticated && (
                              <div>
                                <FollowsButton
                                  user={user}
                                  reduxUser={reduxUser}
                                />
                              </div>
                            )}
                          </div>
                          <div className="text-left pt-1">
                            <span className="whitespace-pre-line">
                              {user.bio}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div key={index} className="flex p-8 justify-center">
              <div className="flex flex-col max-w-sm">
                <img
                  src="https://twitter-clone.fra1.cdn.digitaloceanspaces.com/not-found-images/yellow-birds-power-line-800x400.v1.0891edb9.png"
                  alt=""
                />
                <span className="text-3xl font-bold mb-2">
                  Looking for followers?
                </span>
                <span>
                  When someone follows this account, they’ll show up here.
                  Tweeting and interacting with others helps boost followers.
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

export default Followers;
