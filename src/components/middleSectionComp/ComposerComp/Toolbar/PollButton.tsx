import { ComposerState, setShowPoll } from "@redux/slices/composerSlice";
import { useDispatch } from "react-redux";
import { PollIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  composer: ComposerState;
}

const PollButton = ({ composer }: IProps) => {
  const dispatch = useDispatch();

  const pollButtonClasses = classNames("w-fit p-2", {
    "hover:bg-primary-extraLight rounded-full cursor-pointer":
      composer.mediaFiles.length === 0 &&
      !composer.tenorGif &&
      !composer.showPoll,
    "opacity-50":
      composer.mediaFiles.length > 0 || composer.tenorGif || composer.showPoll,
  });

  return (
    <button
      type="button"
      disabled={
        composer.mediaFiles.length > 0 ||
        !!composer.tenorGif ||
        composer.showPoll
      }
      onClick={() => dispatch(setShowPoll(true))}
      className={pollButtonClasses}
    >
      <span className={"w-8 h-8"}>
        <PollIcon
          className={"w-5 h-5 text-primary-base fill-current font-bold"}
        />
      </span>
    </button>
  );
};

export default PollButton;
