import { ReTweetIcon } from "@icons/Icon";
import { useState } from "react";
import { ITweet } from "@customTypes/TweetTypes";
import { DigalogModals } from "@components/middleSectionComp";
import { formatNumber } from "@utils/formatNumber";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { retweetTweet, undoRetweet } from "api/tweetApi";
import { UserState } from "@redux/slices/userSlice";
import { PersistPartial } from "redux-persist/es/persistReducer";
import ReTweetMenu from "../ReTweetMenu";
import useToast from "@hooks/useToast";

interface IProps {
  isAuthenticated: boolean;
  reduxUser: UserState & PersistPartial;
  tweet: ITweet;
  pageType: "home" | "TweetDetails";
  retweetStats: {
    _id: string;
    author: string;
  }[];
}

const RetweetAction = ({
  isAuthenticated,
  reduxUser,
  tweet,
  pageType,
  retweetStats,
}: IProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [reTweetMenu, setShowRetweetMenu] = useState(false);
  const [showQuoteModal, setShowQuotModal] = useState(false);

  const isReteeted =
    retweetStats?.length! > 0 &&
    retweetStats?.some((retweet) => retweet.author === reduxUser.user?._id);

  const retweetMutation = useMutation({
    mutationKey: ["retweet", tweet._id],
    mutationFn: retweetTweet,
    onError: (err: any) => {
      showToast(err?.message || "error", "error");
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["tweetStats", tweet._id]);
      queryClient.invalidateQueries(["followingFeed"]);
      queryClient.invalidateQueries(["forYouFeed"]);
      showToast(res?.message || "Tweet retweeted", "success");
    },
  });

  const undoRetweetMutation = useMutation({
    mutationKey: ["undoRetweet", tweet._id],
    mutationFn: undoRetweet,
    onError: (err: any) => {
      showToast(err?.message || "error", "error");
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["tweetStats", tweet._id]);
      queryClient.invalidateQueries(["followingFeed"]);
      queryClient.invalidateQueries(["forYouFeed"]);
      showToast(res?.message || "Tweet unretweeted", "success");
    },
  });

  const handleRetweet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowRetweetMenu(false);
    if (isAuthenticated) {
      if (isReteeted) {
        undoRetweetMutation.mutate(tweet._id);
      } else {
        retweetMutation.mutate(tweet._id);
      }
    }
  };

  return (
    <div>
      {showQuoteModal && isAuthenticated && (
        <DigalogModals.ReplyQuoteModal
          composerMode={"quote"}
          tweet={tweet}
          isOpen={showQuoteModal}
          onClose={() => setShowQuotModal(false)}
        />
      )}

      <div
        title={isReteeted ? "Undo Retweet" : "Retweet"}
        onClick={(e) => {
          setShowRetweetMenu(!reTweetMenu);
          e.stopPropagation();
        }}
        className="group h-5 min-h-max relative cursor-pointer"
      >
        <div className="flex flex-row">
          <div className="inline-flex relative text-gray-dark group-hover:text-green-base duration-150">
            <div className="absolute -m-2 group-hover:bg-green-extraLigt  duration-150 rounded-full top-0 right-0 left-0 bottom-0" />
            {isReteeted ? (
              <ReTweetIcon className={"w-5 h-5 text-green-base"} />
            ) : (
              <ReTweetIcon className={"w-5 h-5"} />
            )}
          </div>
          <div className="inline-flex group-hover:text-green-base">
            <span className="px-3 text-sm">
              {retweetStats?.length! > 0 &&
                pageType === "home" &&
                formatNumber(retweetStats?.length!)}
            </span>
          </div>
        </div>
        {reTweetMenu && isAuthenticated && (
          <ReTweetMenu
            onClose={() => setShowRetweetMenu(false)}
            setShowQuotModal={setShowQuotModal}
            handleRetweet={handleRetweet}
            isReteeted={isReteeted}
          />
        )}
      </div>
    </div>
  );
};

export default RetweetAction;
