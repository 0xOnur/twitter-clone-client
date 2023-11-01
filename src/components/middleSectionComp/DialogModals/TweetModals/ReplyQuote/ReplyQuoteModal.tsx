import { TweetComposer } from "@components/middleSectionComp/ComposerComp";
import { TweetCard } from "@components/middleSectionComp/TweetCard";
import ReplyTo from "../../../TweetCard/components/Other/ReplyTo";
import { CancelIcon } from "@icons/Icon";

interface IProps {
  tweet: ITweet;
  composerMode: "reply" | "quote";
  closeModal: () => void;
}

const ReplyQuoteModal = ({ closeModal, tweet, composerMode }: IProps) => {
  return (
    <div className="z-10 bg-[color:var(--background-primary)] w-full max-w-600px rounded-xl overflow-hidden">
      <div className="overflow-y-auto max-h-90vh">
        <div className="sticky top-0 z-10">
          <div className="flex h-[53px] items-center mx-2 bg-[color:var(--background-primary-alpha)] backdrop-blur-md">
            <button
              type="button"
              onClick={closeModal}
              className="p-2 hover:bg-[color:var(--background-third)] rounded-full"
            >
              <CancelIcon className={"w-5 h-5"} />
            </button>
          </div>
        </div>

        <div className="flex flex-col py-1 ">
          <TweetCard
            isAuthenticated={true}
            pageType="home"
            tweetId={tweet._id}
            hideActions
            isReply
          />

          <div className="flex flex-col px-4">
            <div className="flex ml-14">
              <ReplyTo
                username={tweet.author.username}
                url={`/${tweet.author.username}/status/${tweet._id}`}
              />
            </div>

            <div className="h-full">
              <TweetComposer
                composerMode={composerMode}
                originalTweet={tweet}
                onClose={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyQuoteModal;
