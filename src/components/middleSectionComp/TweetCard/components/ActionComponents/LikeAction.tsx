import { ITweet } from "@customTypes/TweetTypes";
import { LikeIcon, LikedIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import { formatNumber } from "@utils/formatNumber";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeTweet, unlikeTweet } from "api/tweetApi";
import { PersistPartial } from "redux-persist/es/persistReducer";
import useToast from "@hooks/useToast";

interface IProps {
  isAuthenticated: boolean;
  reduxUser: UserState & PersistPartial;
  tweet: ITweet;
  pageType: "home" | "TweetDetails";
}

const LikeAction = ({
  isAuthenticated,
  reduxUser,
  tweet,
  pageType,
}: IProps) => {
  const queryClient = useQueryClient();

  const { showToast } = useToast();

  const likeMutation = useMutation({
    mutationKey: ["likeTweet", tweet._id],
    mutationFn: likeTweet,
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tweet", tweet._id]);
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
    },
  });

  return (
    <button
      title="Like"
      onClick={(e) => {
        e.stopPropagation();
        if (isAuthenticated) {
          if (tweet.likes?.includes(reduxUser.user?._id)) {
            unlikeMutation.mutate(tweet._id);
          } else {
            likeMutation.mutate(tweet._id);
          }
        }
      }}
      className="group h-5 min-h-max"
    >
      <div className="flex flex-row">
        <div className="inline-flex relative text-gray-dark group-hover:text-red-base duration-150">
          <div className="absolute -m-2 group-hover:bg-red-extraLight duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
          {tweet.likes?.includes(reduxUser.user?._id) ? (
            <LikedIcon className={"w-5 h-5 fill-red-removeText"} />
          ) : (
            <LikeIcon className={"w-5 h-5"} />
          )}
        </div>
        <div className="inline-flex  group-hover:text-red-base">
          <span className="px-3 text-sm">
            {tweet?.likes!.length! > 0 &&
              pageType === "home" &&
              formatNumber(tweet.likes!.length)}
          </span>
        </div>
      </div>
    </button>
  );
};

export default LikeAction;
