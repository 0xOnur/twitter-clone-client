import { TweetCardComp } from "@components/middleSectionComp";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { UserState } from "@redux/slices/userSlice";
import { formatNumber } from "@utils/formatNumber";
import { ReTweetIcon } from "@icons/Icon";
import { useState, useEffect, useCallback } from "react";
import { usePopper } from "react-popper";
import { Portal } from "contexts/Portal";

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

  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [{ name: "offset", options: { offset: [0, -30] } }],
  });

  const isReteeted =
    retweetStats?.length! > 0 &&
    retweetStats?.some((retweet) => retweet.author === reduxUser.user?._id);

  const handleClose = useCallback(
    (e: MouseEvent) => {
      if (
        popperElement &&
        !popperElement.contains(e.target as Node) &&
        !referenceElement?.contains(e.target as Node)
      ) {
        setShowRetweetMenu(false);
      }
    },
    [popperElement, referenceElement]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <button
      title={isReteeted ? "Undo Retweet" : "Retweet"}
      ref={setReferenceElement}
      onClick={(e) => {
        e.stopPropagation();
        setShowRetweetMenu(!reTweetMenu);
      }}
      className="group h-5 min-h-max relative"
    >
      <div className="flex flex-row">
        <div className="inline-flex relative duration-150">
          <div className="absolute top-0 right-0 left-0 bottom-0 -m-2 rounded-full group-hover:bg-green-base/30 duration-150" />
          {isReteeted ? (
            <ReTweetIcon className={"w-5 h-5 text-green-base"} />
          ) : (
            <ReTweetIcon
              className={
                "w-5 h-5 text-[color:var(--color-base-secondary)] group-hover:text-green-base"
              }
            />
          )}
        </div>
        {retweetStats?.length > 0 && pageType === "home" && (
          <div className="inline-flex">
            <span className="px-3 text-sm text-[color:var(--color-base-secondary)] group-hover:text-green-base">
              {formatNumber(retweetStats?.length)}
            </span>
          </div>
        )}
      </div>
      {reTweetMenu && isAuthenticated && (
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <TweetCardComp.Components.ReTweetMenu
              tweet={tweet}
              isReteeted={isReteeted}
              onClose={() => setShowRetweetMenu(false)}
            />
          </div>
        </Portal>
      )}
    </button>
  );
};

export default RetweetAction;
