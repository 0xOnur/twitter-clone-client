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
    <div className="overflow-hidden z-10 w-max rounded-2xl bg-[color:var(--background-primary)] shadow-box">
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
