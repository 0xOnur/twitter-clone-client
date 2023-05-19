import { useQuery } from "@tanstack/react-query";
import { getUserLikes } from "api/userApi";
import { ITweet } from "@customTypes/TweetTypes";
import { LoadingIcon, RetryIcon } from "@icons/Icon";
import TweetCard from "@components/middleSectionComp/TweetCard";

interface IProps {
  username: string;
}

const LikesTab = ({ username }: IProps) => {
  const userLikesQuery = useQuery<ITweet[]>({
    queryKey: ["userLikes", username],
    queryFn: () => getUserLikes(username),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (userLikesQuery.isLoading) {
    return (
      <div className="flex p-8 justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (userLikesQuery.isError) {
    return (
      <div className="flex flex-col max-w-600px w-full justify-center items-center py-5 px-3">
        <span className="mb-5 text-center">
          Something went wrong. Try reloading.
        </span>
        <button
          onClick={() => userLikesQuery.refetch()}
          className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
        >
          <RetryIcon className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Retry</span>
        </button>
      </div>
    );
  }

  if (userLikesQuery.data.length > 0) {
    return (
      <div className="flex flex-col">
        {userLikesQuery.data.map((tweet, index) => (
          <div key={index} className="border-b">
            <TweetCard
              key={index}
              isAuthenticated={true}
              pageType="home"
              tweet={tweet}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex p-8 justify-center">
      <div className="flex flex-col max-w-sm">
        <span className="text-3xl font-bold">
          @{username} hasn't Liked
        </span>
        <span>When they do, their Likes will show up here.</span>
      </div>
    </div>
  );
};

export default LikesTab;
