import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { LoadingIcon } from "@icons/Icon";
import { UserPreviewCard } from "../UserProfile";
import { RootState } from "redux/config/store";
import { useSelector } from "react-redux";
import { whoToFollow } from "api/userApi";
import { useEffect } from "react";
import { RefetchError } from "@components/Others";

const Peoples = () => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const { ref, inView } = useInView();

  const fetchConnectPeople = ({ pageParam = 0 }) => {
    return whoToFollow(pageParam, 20);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["connectPeople"], fetchConnectPeople, {
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
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "loading") {
    return (
      <div className="flex w-full mt-20 items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (status === "error") {
    return (
      <RefetchError refetch={refetch} />
    );
  }

  if (data) {
    return (
      <div>
        <div className="p-3">
          <span className="text-xl leading-6 font-extrabold">
            Suggested for you
          </span>
        </div>
        {data.pages.map((page, index) => (
          <div key={index}>
            {page.data.map((user: IUser) => (
              <UserPreviewCard key={user._id} user={user} reduxUser={reduxUser} showBio={true} />
            ))}
          </div>
        ))}
        {isFetchingNextPage && (
          <div className="flex w-full mt-20 items-center justify-center">
            <LoadingIcon />
          </div>
        )}

        <div ref={ref} className="h-56" />
      </div>
    );
  }

  return null;
};

export default Peoples;
