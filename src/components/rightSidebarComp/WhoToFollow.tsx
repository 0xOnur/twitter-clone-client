import { UserPreviewCard } from "@components/middleSectionComp/UserProfile";
import { LoadingIcon, RetryIcon } from "@icons/Icon";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@customTypes/UserTypes";
import { RootState } from "redux/config/store";
import { useSelector } from "react-redux";
import { whoToFollow } from "api/userApi";

type WhoToFollowResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: IUser[];
};

const WhoToFollow = () => {
  const reduxUser = useSelector((state: RootState) => state.user);

  const whoToFollowQuery = useQuery<WhoToFollowResponse>({
    queryKey: ["whoToFollow"],
    queryFn: () => whoToFollow(0, 3),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (whoToFollowQuery.isLoading) {
    return (
      <div className="flex flex-col items-center bg-gray-rightbar rounded-2xl mt-5">
        <div className="p-3">
          <span className="text-xl font-bold">Who to follow</span>
        </div>
        <LoadingIcon />
      </div>
    );
  }

  if (whoToFollowQuery.isError) {
    return (
      <div className="flex flex-col items-center bg-gray-rightbar rounded-2xl mt-5">
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

  if (whoToFollowQuery.data.data) {
    return (
      <div className="bg-gray-rightbar rounded-2xl mt-5">
        <div className="p-3">
          <span className="text-xl font-bold">Who to follow</span>
        </div>

        <div>
          {whoToFollowQuery.data.data.map((user: IUser) => (
            <UserPreviewCard
              key={user._id}
              user={user}
              reduxUser={reduxUser}
              showBio={false}
            />
          ))}
        </div>
        <a
          href="/i/connect_people/"
          className="flex flex-col w-full hover:bg-gray-trendsHover rounded-b-2xl px-3 py-4 duration-100"
        >
          <span className="text-primary-base">Show More</span>
        </a>
      </div>
    );
  }

  return null;
};

export default WhoToFollow;
