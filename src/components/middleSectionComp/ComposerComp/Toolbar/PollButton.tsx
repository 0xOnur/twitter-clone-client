import { ComposerState, setShowPoll } from "@redux/slices/composerSlice";
import { useDispatch } from "react-redux";
import { PollIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  composer: ComposerState;
}

const PollButton = ({ composer }: IProps) => {
  const dispatch = useDispatch();

  const pollButtonClasses = classNames("relative w-fit p-2 group", {
    "opacity-50":
      composer.mediaFiles.length > 0 || composer.tenorGif || composer.showPoll,
  });

  const hoverClassNames = classNames(
    "absolute left-0 top-0 w-full h-full rounded-full opacity-30",
    {
      "group-hover:bg-[color:var(--color-secondary)] rounded-full":
        composer.mediaFiles.length === 0 &&
        !composer.tenorGif &&
        !composer.showPoll,
    }
  );

  return (
    <button
      title="Poll"
      disabled={
        composer.mediaFiles.length > 0 ||
        !!composer.tenorGif ||
        composer.showPoll
      }
      onClick={() => dispatch(setShowPoll(true))}
      className={pollButtonClasses}
    >
      <div className={hoverClassNames} />
      <span className="w-8 h-8">
        <PollIcon className={"w-5 h-5 text-[color:var(--color-primary)]"} />
      </span>
    </button>
  );
};

export default PollButton;
