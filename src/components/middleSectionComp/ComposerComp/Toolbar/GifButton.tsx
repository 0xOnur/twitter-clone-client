import { ComposerState, setTenorGif } from "@redux/slices/composerSlice";
import { ComposerComp } from "@components/middleSectionComp";
import { useModal } from "contexts/ModalContext";
import { GIFIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  composer: ComposerState;
}

const GifButton = ({ composer }: IProps) => {
  const { openModal, closeModal } = useModal();

  const handleGif = () => {
    openModal(
      <ComposerComp.GIFMenu setAction={setTenorGif} closeModal={closeModal} />
    );
  };

  const gifButtonClasses = classNames("relative w-fit p-2 group", {
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
      title="GIF"
      onClick={handleGif}
      disabled={
        composer.mediaFiles.length > 0 ||
        !!composer.tenorGif ||
        composer.showPoll
      }
      className={gifButtonClasses}
    >
      <div className={hoverClassNames} />
      <span className="w-8 h-8">
        <GIFIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
      </span>
    </button>
  );
};

export default GifButton;
