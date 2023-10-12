import React, { useState, useEffect, useCallback } from "react";
import { RootState } from "@redux/config/store";
import { useSelector } from "react-redux";
import { ListsIcon, TreeDotIcon } from "@icons/Icon";
import DeleteItem from "./DeleteItem";
import FollowItem from "./FollowItem";
import CopyItem from "./CopyItem";
import { Portal } from "contexts/Portal";
import { usePopper } from "react-popper";

interface IProps {
  isAuthenticated?: boolean;
  tweet: ITweet;
}

const MoreMenu = ({ isAuthenticated, tweet }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "left-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -30],
        },
      },
    ],
  });

  const onClose = () => {
    setShowMoreMenu(false);
  };

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        popperElement &&
        !popperElement.contains(e.target as Node) &&
        !referenceElement?.contains(e.target as Node)
      ) {
        onClose();
      }
    },
    [popperElement, referenceElement]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div>
      <button
        title="More"
        ref={setReferenceElement}
        onClick={(e) => {
          e.stopPropagation();
          setShowMoreMenu(true);
        }}
        className="group h-5 min-h-max"
      >
        <div className="flex flex-row">
          <div className=" relative text-gray-dark group-hover:text-primary-dark duration-150">
            <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0" />
            <TreeDotIcon className={"w-6 h-6"} />
          </div>
        </div>
      </button>

      {showMoreMenu && (
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="z-50 border bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col">
              {isAuthenticated && reduxUser.user?._id !== tweet.author._id && (
                <FollowItem
                  user={tweet.author}
                  reduxUser={reduxUser}
                  onClose={onClose}
                />
              )}

              {reduxUser.user?._id === tweet.author._id && (
                <DeleteItem tweet={tweet} onClose={onClose} />
              )}

              <CopyItem tweet={tweet} onClose={onClose} />

              <button className="flex flex-row cursor-not-allowed hover:bg-gray-lightest font-bold">
                <div className="flex flex-row py-3 px-4 items-center">
                  <div className="mr-2">
                    <ListsIcon className={"w-5 h-5"} />
                  </div>
                  <div>
                    <span>Add/remove @{tweet.author.username} from Lists</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default MoreMenu;
