import { useCopyText } from "@hooks/useCopyText";
import { WebsiteIcon } from "@icons/Icon";

interface IProps {
  tweet: ITweet;
  closeMenu: () => void;
}

const CopyItem = ({ tweet, closeMenu }: IProps) => {
  const tweetURL = window.location.origin + `/${tweet.author.username}/status/${tweet._id}`;
  const { copyText } = useCopyText({text: tweetURL, toastMessage: "Copied to clipboard"});
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        copyText();
        closeMenu();
      }}
      type="button"
      className="flex flex-row font-bold hover:bg-[color:var(--background-third)]"
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