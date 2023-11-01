import { ShareIcon } from "@icons/Icon";

const ShareTweet = () => {
  return (
    <button className="flex flex-row cursor-not-allowed font-bold hover:bg-[color:var(--background-third)]">
      <div className="flex flex-row py-3 px-4 items-center">
        <div className="mr-2">
          <ShareIcon className={"w-5 h-5"} />
        </div>
        <div>
          <span>Share Tweet via ...</span>
        </div>
      </div>
    </button>
  );
};

export default ShareTweet;
