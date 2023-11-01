import CircleProgressBar from "../CircleProgressBar";
import ScheduleButton from "./ScheduleButton";
import ImageButton from "./ImageButton";
import PollButton from "./PollButton";
import GifButton from "./GifButton";
import Emoji from "./Emoji";
import { ComposerState } from "@redux/slices/composerSlice";
import SubmiButton from "./SubmiButton";

type Props = {
  composer: ComposerState;
  composerMode: "tweet" | "reply" | "quote";
  originalTweet: ITweet | undefined;
  onClose?: () => void;
};

const Toolbar = ({ composer, composerMode, originalTweet, onClose }: Props) => {
  return (
    <div className="flex">
      <div className="flex justify-between w-full my-3">
        <div className="w-full flex">
          <ImageButton composer={composer} />

          <GifButton composer={composer} />

          <PollButton composer={composer} />

          <Emoji composer={composer} />

          <ScheduleButton />
        </div>

        <div className="w-full h-full text-right">
          <div className="flex h-full justify-end items-center">
            {composer.tweetText.length > 0 && (
              <>
                <CircleProgressBar
                  value={composer.tweetText.length}
                  limit={280}
                />
                <div className="mx-3 w-0.5 h-full bg-[color:var(--background-third)]" />
              </>
            )}
            <SubmiButton
              composer={composer}
              composerMode={composerMode}
              originalTweet={originalTweet}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
