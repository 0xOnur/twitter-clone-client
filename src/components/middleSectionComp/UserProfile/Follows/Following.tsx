import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";
import { getUserFollowings } from "api/userApi";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@customTypes/UserTypes";
import { LoadingIcon, RetryIcon, VerifiedIcon } from "@icons/Icon";
import FollowUnfollow from "../UserCard/UserActions/FollowUnfollow";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";

const Following = () => {
  const username = useParams().username;
  const navigate = useNavigate();

  const reduxUser = useSelector((state: RootState) => state.user);

  const followingsQuery = useQuery<IUser[]>({
    queryKey: ["followings", username],
    queryFn: () => getUserFollowings(username!),
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log(followingsQuery.data);

  if (followingsQuery.isLoading) {
    return (
      <div className="flex w-full mt-20 items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (followingsQuery.isError) {
    return (
      <div className="flex flex-col max-w-600px w-full justify-center items-center py-5 px-3">
        <span className="mb-5 text-center">
          Something went wrong. Try reloading.
        </span>
        <button
          onClick={() => followingsQuery.refetch()}
          className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
        >
          <RetryIcon className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Retry</span>
        </button>
      </div>
    );
  }

  if (followingsQuery.data.length > 0) {
    return (
      <div>
        {followingsQuery.data?.map((user: IUser) => {
          return (
            <div key={user._id} className="flex flex-col w-full">
              <div
                onClick={() => navigate(`/${user.username}`)}
                className="cursor-pointer py-3 px-4 hover:bg-gray-tweetHover duration-200"
              >
                <div className="flex flex-row ">
                  <Avatar avatar={user.avatar!} username={username!} />

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
                        {user._id !== reduxUser.user._id && (
                          <FollowUnfollow user={user} reduxUser={reduxUser} />
                        )}
                      </div>
                    </div>

                    <div className="text-left pt-1">
                      <span className="whitespace-pre-line">{user.bio}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex p-8 justify-center">
      <div className="flex flex-col max-w-sm">
        <span className="text-3xl font-bold">@{username} hasn't followed</span>
        <span>When they do, their Tweets will show up here.</span>
      </div>
    </div>
  );
};

export default Following;
