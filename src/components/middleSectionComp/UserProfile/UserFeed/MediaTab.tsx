import { useQuery } from "@tanstack/react-query";
import { ITweet } from "@customTypes/TweetTypes";
import { getMediaOnlyUserTweets } from "api/userApi";
import { LoadingIcon, RetryIcon } from "@icons/Icon";
import TweetCard from "@components/middleSectionComp/TweetCard";

interface IProps {
  username: string;
}

const MediaTab = ({ username }: IProps) => {
  const mediaOnlyUserTweetsQuery = useQuery<ITweet[]>({
    queryKey: ["mediaOnlyUserTweets", username],
    queryFn: () => getMediaOnlyUserTweets(username),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (mediaOnlyUserTweetsQuery.isLoading) {
    return (
      <div className="flex p-8 justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (mediaOnlyUserTweetsQuery.isError) {
    return (
      <div className="flex flex-col max-w-600px w-full justify-center items-center py-5 px-3">
        <span className="mb-5 text-center">
          Something went wrong. Try reloading.
        </span>
        <button
          onClick={() => mediaOnlyUserTweetsQuery.refetch()}
          className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
        >
          <RetryIcon className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Retry</span>
        </button>
      </div>
    );
  }
  
  if (mediaOnlyUserTweetsQuery.data.length > 0) {
    return (
      <div className="flex flex-col">
        {mediaOnlyUserTweetsQuery.data.map((tweet, index) => (
          <div key={index} className="border-b">
            <TweetCard
              tweetId={tweet._id}
              isAuthenticated={true}
              pageType="home"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex p-8 justify-center">
      <div className="flex flex-col max-w-sm">
        <img
          src="https://res.cloudinary.com/dwcw9iftp/image/upload/v1684520718/Twitter/Tweets/masked-doll-head-with-camera-800x400.png"
          alt=""
        />
        <span className="text-3xl font-bold">
          @{username} hasn't Tweeted Media
        </span>
        <span>When they do, their Tweets will show up here.</span>
      </div>
    </div>
  );
};

export default MediaTab;
