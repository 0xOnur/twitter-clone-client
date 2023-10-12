import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { ComposerComp } from "@components/index";
import { RootState } from "@redux/config/store";
import MediaCard from "./ComposerMedia";
import Toolbar from "./Toolbar";
import { LoadingIcon } from "@icons/Icon";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectComposer } from "@redux/slices/composerSlice";

type IProps = {
  composerMode: "tweet" | "reply" | "quote";
  originalTweet?: ITweet;
  onClose?: () => void;
};

const TweetComposer = ({ composerMode, originalTweet, onClose }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const composer = useSelector(selectComposer)

  const composerClass = classNames("flex flex-col", {
    "contrast-50" : composer.isLoading,
  });

  return (
    <div>
      <div className="pt-1 relative ">
        {composer.isLoading && (
          <div className="absolute z-10 flex w-full h-full items-center justify-center">
            <LoadingIcon />
          </div>
        )}
        <div className={composerClass}>
          <div className="flex  flex-row w-full h-fit">
            <div className="w-14 h-14 pt-1">
              <Avatar
                avatar={reduxUser.user.avatar!}
                href={`/${reduxUser.user.username!}`}
              />
            </div>

            <div className="flex flex-col w-full pt-1">
              {(composer.tweetText.length > 0 ||
                composer.mediaFiles.length > 0 ||
                composer.showPoll ||
                composer.tenorGif) &&
                composerMode !== "reply" && (
                  <ComposerComp.ChooseAudience
                    composerSettings={composer.settings}
                  />
                )}

              <ComposerComp.TextArea
                tweetText={composer.tweetText}
                composerMode={composerMode}
              />

              <MediaCard
                tenorGif={composer.tenorGif}
                mediaFiles={composer.mediaFiles}
              />

              {composer.showPoll && (
                <ComposerComp.PollMenu
                  poll={composer.poll}
                />
              )}

              {(composer.tweetText.length > 0 ||
                composer.mediaFiles.length > 0 ||
                composer.showPoll ||
                composer.tenorGif) &&
                composerMode !== "reply" && (
                  <ComposerComp.ChooseCanReply
                    composerSettings={composer.settings}
                  />
                )}

              <Toolbar
                composer={composer}
                composerMode={composerMode}
                originalTweet={originalTweet}
                onClose={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetComposer;
