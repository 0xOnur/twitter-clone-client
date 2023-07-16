import { useCopyTweet } from "@hooks/tweet/useCopyTweetURL";
import { WebsiteIcon } from "@icons/Icon";

interface IProps {
  tweet: ITweet;
  onClose: () => void;
}

const CopyItem = ({ tweet, onClose }: IProps) => {
  const { copyTweet } = useCopyTweet(tweet);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        copyTweet();
        onClose();
      }}
      type="button"
      className="flex flex-row hover:bg-gray-lightest font-bold"
    >
      <div className="flex flex-row py-3 px-4 items-center">
        <div className="mr-2">
          <WebsiteIcon className={"w-5 h-5"} />
        </div>
        <div>
          <span>Copy link to Tweet</span>
        </div>
      </div>
    </button>
  );
};

export default CopyItem;