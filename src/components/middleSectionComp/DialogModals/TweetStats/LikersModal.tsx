import { UserPreviewCard } from "@components/middleSectionComp/UserProfile";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { CancelIcon, LoadingIcon, RetryIcon } from "@icons/Icon";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useRef } from "react";
import { UserState } from "@redux/slices/userSlice";
import { IUser } from "@customTypes/UserTypes";
import { getLikers } from "api/tweetApi";

interface IProps {
  tweetId: string;
  reduxUser: UserState & PersistPartial;
  isOpen: boolean;
  onClose: () => void;
}

const LikersModal = ({ tweetId, reduxUser, isOpen, onClose }: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView();

  const fetchLikers = ({pageParam = 0}) => {
    return getLikers(tweetId, pageParam, 20);
  }

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["likers", tweetId], fetchLikers, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return false;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [modalRef, onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div ref={modalRef} className="fixed inset-0 bg-black opacity-60" />
      <div className="z-10 border-2 shadow-2xl text-black bg-white w-full max-w-600px min-h-400px rounded-xl overflow-hidden">
        <div className="overflow-y-auto max-h-90vh">
          <div className="sticky top-0 z-20">
            <div className="flex flex-row h-[53px] gap-3 items-center p-3 bg-white/75  backdrop-blur-md border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="p-3 hover:bg-gray-extraLight rounded-full"
              >
                <CancelIcon className={"w-5 h-5"} />
              </button>
              <div>
                <span className="text-xl leading-6 font-bold">
                  Liked by
                </span>
              </div>
            </div>
          </div>

          {status === "loading" && (
            <div className="flex w-full my-20 items-center justify-center">
              <LoadingIcon />
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col max-w-600px w-full justify-center items-center py-5 px-3">
              <span className="mb-5 text-center">
                Something went wrong. Try reloading.
              </span>
              <button
                onClick={() => refetch()}
                className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
              >
                <RetryIcon className="w-6 h-6 text-white" />
                <span className="font-bold text-white">Retry</span>
              </button>
            </div>
          )}

          {data &&
            data.pages.map((page, index) => (
              <div key={index}>
                {page.data.map((user: IUser) => (
                  <UserPreviewCard
                    key={user._id}
                    user={user}
                    reduxUser={reduxUser}
                    showBio={true}
                  />
                ))}
              </div>
            ))}
          {isFetchingNextPage && (
            <div className="flex w-full mt-20 items-center justify-center">
              <LoadingIcon />
            </div>
          )}

          <div ref={ref}></div>
        </div>
      </div>
    </div>
  );
};

export default LikersModal;
