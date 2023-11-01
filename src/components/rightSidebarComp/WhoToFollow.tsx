import { UserPreviewCard } from "@components/middleSectionComp/UserProfile";
import { LoadingIcon } from "@icons/Icon";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "redux/config/store";
import { useSelector } from "react-redux";
import { whoToFollow } from "api/userApi";
import { RefetchError } from "..";

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
      <div className="bg-[color:var(--background-secondary)] rounded-2xl mt-5">
        <div className="flex flex-col gap-3 items-center py-3">
          <span className="text-xl font-bold">Who to follow</span>
          <LoadingIcon />
        </div>
      </div>
    );
  }

  if (whoToFollowQuery!.isError) {
    return (
      <div className="bg-[color:var(--background-secondary)] rounded-2xl mt-5 max-h-[500px]">
        <div className="flex flex-col gap-3 items-center py-3">
          <span className="text-xl font-bold">Who to follow</span>
          <RefetchError
            refetch={whoToFollowQuery.refetch}
            customClassName="flex flex-col max-w-600px w-full h-full justify-center items-center py-5 px-3"
          />
        </div>
      </div>
    );
  }

  if (whoToFollowQuery.data.data) {
    return (
      <div className="bg-[color:var(--background-secondary)] rounded-2xl mt-5">
        <div className="flex flex-col gap-3">
          <span className="text-xl font-bold px-3 pt-3">Who to follow</span>
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
        </div>
        <a
          href="/i/connect_people/"
          className="flex flex-col w-full hover:bg-[color:var(--background-third)] rounded-b-2xl px-3 py-4 duration-100"
        >
          <span className="font-semibold text-[color:var(--color-primary)]">
            Show More
          </span>
        </a>
      </div>
    );
  }

  return null;
};

export default WhoToFollow;
