import useUndoRetweetMutation from "@hooks/Tweet/Mutations/useUndoRetweetMutation";
import useRetweetMutation from "@hooks/Tweet/Mutations/useRetweetMutation";
import { TweetCardComp } from "@components/middleSectionComp";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { UserState } from "@redux/slices/userSlice";
import { formatNumber } from "@utils/formatNumber";
import { ReTweetIcon } from "@icons/Icon";
import { useState } from "react";

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
  const { retweetMutate } = useRetweetMutation();
  const { undoRetweetMutate } = useUndoRetweetMutation();

  const [reTweetMenu, setShowRetweetMenu] = useState(false);

  const isReteeted =
    retweetStats?.length! > 0 &&
    retweetStats?.some((retweet) => retweet.author === reduxUser.user?._id);

  const handleRetweet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowRetweetMenu(false);
    if (isAuthenticated) {
      if (isReteeted) {
        undoRetweetMutate(tweet._id)
      } else {
        retweetMutate(tweet._id);
      }
    }
  };

  return (
    <div>
      <div
        title={isReteeted ? "Undo Retweet" : "Retweet"}
        onClick={(e) => {
          e.stopPropagation();
          setShowRetweetMenu(!reTweetMenu);
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
              {retweetStats?.length > 0 &&
                pageType === "home" &&
                formatNumber(retweetStats?.length)}
            </span>
          </div>
        </div>
        {reTweetMenu && isAuthenticated && (
          <TweetCardComp.Components.ReTweetMenu
            tweet={tweet}
            onClose={() => setShowRetweetMenu(false)}
            handleRetweet={handleRetweet}
            isReteeted={isReteeted}
          />
        )}
      </div>
    </div>
  );
};

export default RetweetAction;
