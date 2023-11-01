import {
  AuthorInfo,
  Avatar,
  TweetContent,
  TweetMedia,
} from "@components/middleSectionComp/TweetCard/components";
import useGetTweet from "@hooks/Tweet/Queries/useGetTweet";
import { useNavigate } from "react-router-dom";

interface IProps {
  tweetId: string;
}

const MessageTweetCard = ({ tweetId }: IProps) => {
  const navigate = useNavigate();

  const { tweet, status } = useGetTweet({ tweetId: tweetId });

  return (
    <div className="w-full">
      {status === "loading" && (
        <div className="flex flex-row items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[color:var(--color-primary)]"></div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-row items-center justify-center">
          <div className="text-red-500">
            <span className="">Tweet not found</span>
          </div>
        </div>
      )}

      {status === "success" && (
        <button
          onClick={() => {
            navigate(`/${tweet?.author.username}/status/${tweet?._id}`);
          }}
          className="shadow-box rounded-2xl overflow-hidden hover:bg-[color:var(--background-secondary)]"
        >
          <div className="flex flex-col text-left">
            {/* tweet header */}
            <div className="flex flex-col mt-3 mx-3">
              <div className="flex flex-row items-center shrink">
                <Avatar
                  avatar={tweet?.author.avatar!}
                  href={`/${tweet?.author.username}`}
                  avatarSize="w-5 h-5"
                />

                <AuthorInfo
                  tweet={tweet!}
                  pageType="home"
                  isAuthenticated
                  hideMore
                />
              </div>
            </div>
            {/* tweet content */}
            <div className="mx-3 mb-3">
              <TweetContent tweet={tweet!} pageType="home" />
            </div>

            {/* tweet media */}
            {tweet?.media && tweet.media.length > 0 && (
              <div className="flex flex-col mt-1 -mb-2">
                <TweetMedia tweet={tweet} />
              </div>
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default MessageTweetCard;
