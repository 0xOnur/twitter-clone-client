import { ITweet } from "@customTypes/TweetTypes";
import useToast from "@hooks/useToast";

export const useCopyTweet = (tweet: ITweet) => {
  const { showToast } = useToast();

  const copyTweet = () => {
    const tweetUrl =
      window.location.origin + `/${tweet.author.username}/status/${tweet._id}`;
    navigator.clipboard.writeText(tweetUrl);
    showToast("Tweet link copied to clipboard", "success");
  };

  return { copyTweet };
};
