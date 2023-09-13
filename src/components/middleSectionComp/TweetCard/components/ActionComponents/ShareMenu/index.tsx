import { UserState } from "@redux/slices/userSlice";
import SendViaMessage from "./SendViaMessage";
import BookmarkTweet from "./BookmarkTweet";
import ShareTweet from "./ShareTweet";
import CopyTweet from "./CopyTweet";

interface IProps {
  isAuthenticated: boolean;
  reduxUser: UserState;
  tweet: ITweet;
}

const TweetShareMenu = ({ isAuthenticated, reduxUser, tweet }: IProps) => {
  return (
    <div className="absolute z-10 -top-2 -right-3 w-max border bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex flex-col">
        <CopyTweet tweet={tweet} />

        <ShareTweet />

        {isAuthenticated && <SendViaMessage tweet={tweet} />}

        {isAuthenticated && (
          <BookmarkTweet reduxUser={reduxUser} tweet={tweet} />
        )}
      </div>
    </div>
  );
};

export default TweetShareMenu;
