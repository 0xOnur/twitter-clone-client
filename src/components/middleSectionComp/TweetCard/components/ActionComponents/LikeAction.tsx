import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { likeTweet, unlikeTweet } from "api/tweetApi";
import { UserState } from "@redux/slices/userSlice";
import { formatNumber } from "@utils/formatNumber";
import { LikeIcon, LikedIcon } from "@icons/Icon";
import useToast from "@hooks/useToast";

interface IProps {
  isAuthenticated: boolean;
  reduxUser: UserState & PersistPartial;
  tweet: ITweet;
  pageType: "home" | "TweetDetails";
  likeStats: {
    _id: string;
    author: string;
  }[];
}

const LikeAction = ({
  isAuthenticated,
  reduxUser,
  tweet,
  pageType,
  likeStats,
}: IProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const isLiked =
    likeStats?.length! > 0 &&
    likeStats?.some((like) => like.author === reduxUser.user?._id);

  const likeMutation = useMutation({
    mutationKey: ["likeTweet", tweet._id],
    mutationFn: likeTweet,
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tweet", tweet._id]);
      queryClient.invalidateQueries(["tweetStats", tweet._id]);
    },
  });

  const unlikeMutation = useMutation({
    mutationKey: ["unlikeTweet", tweet._id],
    mutationFn: unlikeTweet,
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tweet", tweet._id]);
      queryClient.invalidateQueries(["tweetStats", tweet._id]);
    },
  });

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isAuthenticated) {
      if (isLiked) {
        unlikeMutation.mutate(tweet._id);
      } else {
        likeMutation.mutate(tweet._id);
      }
    }
  };

  return (
    <button
      title={isLiked ? "Unlike" : "Like"}
      onClick={handleLike}
      className="group h-5 min-h-max"
    >
      <div className="flex flex-row">
        <div className="relative">
          <div className="absolute top-0 right-0 left-0 bottom-0 -m-2 rounded-full group-hover:bg-red-base/30 duration-150" />
          {isLiked ? (
            <LikedIcon className={"w-5 h-5 text-red-base"} />
          ) : (
            <LikeIcon className={"w-5 h-5 text-[color:var(--color-base-secondary)] group-hover:text-red-base"} />
          )}
        </div>
        {likeStats?.length > 0 && pageType === "home" && (
          <div className="inline-flex">
            <span className="px-3 text-sm text-[color:var(--color-base-secondary)] group-hover:text-red-base">
              {formatNumber(likeStats?.length)}
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default LikeAction;
