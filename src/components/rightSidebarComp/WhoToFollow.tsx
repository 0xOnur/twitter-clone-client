import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";
import { LoadingIcon, RetryIcon, VerifiedIcon } from "@icons/Icon";
import { useQuery } from "@tanstack/react-query";
import { whoToFollow } from "api/userApi";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { IUser } from "@customTypes/UserTypes";
import FollowUnfollow from "@components/middleSectionComp/UserProfile/UserCard/UserActions/FollowUnfollow";

const WhoToFollow = () => {
  const navigate = useNavigate();

  const reduxUser = useSelector((state: RootState) => state.user);

  const whoToFollowQuery = useQuery<IUser[]>({
    queryKey: ["whoToFollow"],
    queryFn: () => whoToFollow(3),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (whoToFollowQuery.isLoading) {
    return (
      <div className="flex flex-col items-center bg-gray-rightbar rounded-2xl m-3 mt-5 pb-6">
        <div className="p-3">
          <span className="text-xl font-bold">Who to follow</span>
        </div>
        <LoadingIcon />
      </div>
    );
  }

  if (whoToFollowQuery.isError) {
    return (
      <div className="flex flex-col items-center bg-gray-rightbar rounded-2xl m-3 mt-5 pb-6">
        <div className="p-3">
          <span className="text-xl font-bold">Who to follow</span>
        </div>
        <span className="mb-5 text-center">
          Something went wrong. Try reloading.
        </span>
        <button
          onClick={() => whoToFollowQuery.refetch()}
          className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
        >
          <RetryIcon className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Retry</span>
        </button>
      </div>
    );
  }

  if (whoToFollowQuery.data.length > 0) {
    return (
      <div className="bg-gray-rightbar rounded-2xl mt-5">
        <div className="p-3">
          <span className="text-xl font-bold">Who to follow</span>
        </div>
        {whoToFollowQuery.data?.map((user: IUser) => {
          return (
            <div key={user._id} className="flex flex-col w-full">
              <div
                onClick={() => navigate(`/${user.username}`)}
                className="cursor-pointer py-3 px-3 hover:bg-gray-trendsHover duration-200"
              >
                <div className="flex flex-row w-full">
                  <Avatar avatar={user?.avatar!} username={user?.username!} />
                  <div className="flex flex-col w-full overflow-hidden">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-col w-full min-w-0 pr-2">
                        <div className="flex flex-row items-center gap-1">
                          <span className="truncate font-bold ">
                            {user.displayName}
                          </span>
                          <span>
                            {user.isVerified && (
                              <VerifiedIcon className="w-5 h-5 mt-1 text-primary-base" />
                            )}
                          </span>
                        </div>

                        <p className="truncate">@{user.username}</p>
                      </div>
                      <div>
                        <FollowUnfollow user={user} reduxUser={reduxUser} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <a
          href="/"
          className="flex flex-col w-full hover:bg-gray-trendsHover rounded-b-2xl px-3 py-4 duration-100"
        >
          <span className="text-primary-base">Show More</span>
        </a>
      </div>
    );
  }

  return (
    <div className="flex p-8 justify-center">
      <div className="flex flex-col max-w-sm">
        <span className="text-3xl font-bold">can not found</span>
        <span>When they do, their Tweets will show up here.</span>
      </div>
    </div>
  );
};

export default WhoToFollow;
