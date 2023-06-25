import { ReTweetIcon } from "@icons/Icon";
import { useState } from "react";
import { ITweet } from "@customTypes/TweetTypes";
import { DigalogModals } from "@components/middleSectionComp";
import { formatNumber } from "@utils/formatNumber";
import { UserState } from "@redux/slices/userSlice";
import { PersistPartial } from "redux-persist/es/persistReducer";
import ReTweetMenu from "../ReTweetMenu";

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
  const [reTweetMenu, setShowRetweetMenu] = useState(false);
  const [showQuoteModal, setShowQuotModal] = useState(false);

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
        title="Retweet"
        onClick={(e) => {
          setShowRetweetMenu(!reTweetMenu);
          e.stopPropagation();
        }}
        className="group h-5 min-h-max relative cursor-pointer"
      >
        <div className="flex flex-row">
          <div className="inline-flex relative text-gray-dark group-hover:text-green-base duration-150">
            <div className="absolute -m-2 group-hover:bg-green-extraLigt  duration-150 rounded-full top-0 right-0 left-0 bottom-0" />
            {retweetStats?.length > 0 ? (
              retweetStats?.map((retweet, index) => {
                if (retweet.author === reduxUser.user?._id) {
                  return (
                    <ReTweetIcon
                      key={index}
                      className={"w-5 h-5 text-green-base"}
                    />
                  );
                }
                return <ReTweetIcon key={index} className={"w-5 h-5"} />;
              })
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
          />
        )}
      </div>
    </div>
  );
};

export default RetweetAction;
