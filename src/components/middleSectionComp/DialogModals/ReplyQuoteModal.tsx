import { TweetComposer } from "@components/middleSectionComp/ComposerComp";
import { TweetCardComp } from "@components/middleSectionComp";
import { CancelIcon } from "@icons/Icon";


interface IProps {
  tweet: ITweet;
  composerMode: "reply" | "quote";
  closeModal: () => void;
}

const ReplyQuoteModal = ({ closeModal, tweet, composerMode }: IProps) => {

  return (
    <div className="z-10 text-black bg-white w-full max-w-600px rounded-xl overflow-hidden">
    <div className="overflow-y-auto max-h-90vh">
          <div className="sticky top-0 z-10">
            <div className="flex flex-row justify-start items-center p-3 bg-white/80  backdrop-blur-md border-gray-200">
              <button
                type="button"
                onClick={closeModal}
                className="p-3 hover:bg-gray-extraLight rounded-full"
              >
                <CancelIcon className={"w-5 h-5"} />
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-col py-1">
              <div className="flex flex-col px-4">
                <div className="flex flex-row">
                  <div className="flex flex-col grow-0 min-w-fit basis-12 mr-3 items-center">
                    <TweetCardComp.Components.Avatar
                      avatar={tweet.author.avatar!}
                      href={`/${tweet.author.username}`}
                    />
                    <div className="w-0.5 -ml-3 bg-gray-200 mt-1 h-full"/>
                  </div>
                  <div className="flex flex-col grow">
                    <TweetCardComp.Components.AuthorInfo
                      tweet={tweet}
                      pageType="home"
                    />
                    <div className="flex flex-col pb-3">
                      <span>{tweet.content}</span>
                      <div>
                        <TweetCardComp.Components.TweetMedia tweet={tweet} />
                      </div>
                    </div>
                    <div>
                      <a href={`/${tweet.author.username}`}>
                        <span>Replying to </span>
                        <span className="text-primary-base">
                          @{tweet.author.username}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full px-4">
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
