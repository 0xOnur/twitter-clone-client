import { ComposerState, setTenorGif } from "@redux/slices/composerSlice";
import { ComposerComp } from "@components/middleSectionComp";
import { useModal } from "contexts/ModalContext";
import { GIFIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  composer: ComposerState;
}

const GifButton = ({composer}: IProps) => {
  const { openModal, closeModal } = useModal();

  const handleGif = () => {
    openModal(
      <ComposerComp.GIFMenu
        setAction={setTenorGif}
        closeModal={closeModal}
      />
    );
  };

  const gifButtonClasses = classNames("w-fit p-2", {
    "hover:bg-primary-extraLight rounded-full":
    composer.mediaFiles.length === 0 && !composer.tenorGif && !composer.showPoll,
    "opacity-50":
    composer.mediaFiles.length > 0 || composer.tenorGif || composer.showPoll,
  });

  return (
    <button
      onClick={handleGif}
      type="button"
      disabled={
        composer.mediaFiles.length > 0 || !!composer.tenorGif || composer.showPoll
      }
      className={gifButtonClasses}
    >
      <span className="text-primary-base">
        <GIFIcon className={"w-5 h-5 text-primary-base fill-current"} />
      </span>
    </button>
  );
};

export default GifButton;
