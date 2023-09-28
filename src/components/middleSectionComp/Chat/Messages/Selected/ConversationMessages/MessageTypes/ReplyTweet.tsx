import {
  Avatar,
  TweetMedia,
} from "@components/middleSectionComp/TweetCard/components";
import useGetTweet from "@hooks/Tweet/Queries/useGetTweet";
import { VerifiedIcon } from "@icons/Icon";
import { formatDate } from "@utils/formatDate";
import { useNavigate } from "react-router-dom";

interface IProps {
  tweetId: string;
}

const ReplyTweet = ({ tweetId }: IProps) => {
  const navigate = useNavigate();

  const { tweet, status } = useGetTweet({ tweetId: tweetId });

  return (
    <div className="w-full">
      {status === "loading" && (
        <div className="flex flex-row items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-base"></div>
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
          className="flex flex-col w-full text-left border-2 pb-7 shadow rounded-2xl overflow-hidden hover:bg-gray-tweetHover"
        >
          <div className="flex flex-col w-full">
            {/* tweet header */}
            <div className="flex flex-col mt-3 mx-3">
              <div className="flex flex-row items-center shrink">
                <Avatar
                  avatar={tweet?.author.avatar!}
                  href={`/${tweet?.author.username}`}
                  avatarSize="w-5 h-5"
                />

                <div className="flex flex-row items-center">
                  <div className="grid grid-cols-chat items-center">
                    <span className="truncate text-[15px] leading-5 font-bold">
                      {tweet?.author.displayName}
                    </span>
                    {tweet?.author.isVerified && (
                      <span>
                        <VerifiedIcon className="w-5 h-5 mt-1 ml-1 fill-primary-base" />
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-chat gap-1 ml-1">
                    <span className="truncate">@{tweet?.author.username}</span>
                    <span>·</span>
                    <span className="line-clamp-1">
                      {formatDate(tweet?.createdAt!)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid max-h-[250px]">
              {tweet?.content && tweet.content.length > 0 && (
                <div className="mb-3 mx-3">{tweet?.content}</div>
              )}

              {tweet?.media && tweet.media.length > 0 && (
                <div className="-mt-2 -mb-3">
                  <TweetMedia tweet={tweet} />
                </div>
              )}
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default ReplyTweet;
