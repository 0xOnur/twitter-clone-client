import { useBookmarkMutation } from "@hooks/Bookmarks/useBookmarkMutation";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { UserState } from "@redux/slices/userSlice";
import { BookmarksIcon } from "@icons/Icon";

interface IProps {
  isAuthenticated: boolean;
  reduxUser: UserState & PersistPartial;
  tweet: ITweet;
}

const BookmarkAction = ({ isAuthenticated, reduxUser, tweet }: IProps) => {
  const { addBookmarkMutation, removeBookmarkMutation } = useBookmarkMutation(
    tweet._id
  );

  const isBookmarked = tweet.bookmarks?.includes(reduxUser.user?._id!);

  const handleBookmark = () => {
    if (isAuthenticated) {
      if (isBookmarked) {
        removeBookmarkMutation.mutate(tweet._id);
      } else {
        addBookmarkMutation.mutate(tweet._id);
      }
    }
  };

  return (
    <button
      title={isBookmarked ? "Remove Tweet from Bookmarks" : "Bookmark"}
      onClick={handleBookmark}
      className="group h-5 min-h-max"
    >
      <div className="flex flex-row">
        <div className="relative">
          <div className="absolute top-0 right-0 left-0 bottom-0 -m-2 rounded-full group-hover:bg-blue-base/30 duration-150" />
          {isBookmarked ? (
            <BookmarksIcon
              isActive={true}
              className={"w-5 h-5 text-blue-base"}
            />
          ) : (
            <BookmarksIcon
              className={
                "w-5 h-5 text-[color:var(--color-base-secondary)] group-hover:text-blue-base"
              }
            />
          )}
        </div>
      </div>
    </button>
  );
};

export default BookmarkAction;
