import { useBookmarkMutation } from "@hooks/Bookmarks/useBookmarkMutation";
import { BookmarkPlusIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";

interface IProps {
  tweet: ITweet;
  reduxUser: UserState;
}

const BookmarkTweet = ({ reduxUser, tweet }: IProps) => {
  const { addBookmarkMutation, removeBookmarkMutation } = useBookmarkMutation(tweet._id);

  const isBookmarked = tweet.bookmarks?.includes(reduxUser.user?._id!);

  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmarkMutation.mutate(tweet._id);
    } else {
      addBookmarkMutation.mutate(tweet._id);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className="flex flex-row hover:bg-gray-lightest font-bold"
    >
      <div className="flex flex-row py-3 px-4 items-center">
        <div className="mr-2">
          <BookmarkPlusIcon className={"w-5 h-5"} />
        </div>
        <div>
          {isBookmarked ? (
            <span>Remove Tweet from Bookmarks</span>
          ) : (
            <span>Bookmark</span>
          )}
        </div>
      </div>
    </button>
  );
};

export default BookmarkTweet;
