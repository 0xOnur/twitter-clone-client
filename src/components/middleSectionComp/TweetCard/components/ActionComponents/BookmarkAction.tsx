import { ITweet } from "@customTypes/TweetTypes";
import { BookmarksIcon } from "@icons/Icon";
import { useBookmarkMutation } from "@hooks/mutations/useBookmarkMutation";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { UserState } from "@redux/slices/userSlice";

interface IProps {
  isAuthenticated: boolean;
  reduxUser: UserState & PersistPartial;
  tweet: ITweet;
}

const BookmarkAction = ({ isAuthenticated, reduxUser, tweet }: IProps) => {
  const { addBookmarkMutation, removeBookmarkMutation } = useBookmarkMutation(
    tweet._id
  );

  const isBookmarked = tweet.bookmarks?.includes(reduxUser.user?._id);

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
        <div className="inline-flex relative text-gray-dark group-hover:text-primary-base duration-150">
          <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
          {isBookmarked ? (
            <BookmarksIcon
              isActive={true}
              className={"w-5 h-5 text-primary-base"}
            />
          ) : (
            <BookmarksIcon className={"w-5 h-5"} />
          )}
        </div>
      </div>
    </button>
  );
};

export default BookmarkAction;
