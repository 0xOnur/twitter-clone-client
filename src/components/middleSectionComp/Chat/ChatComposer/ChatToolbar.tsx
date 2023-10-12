import { GIFIcon, ImageIcon } from "@icons/Icon";
import Emoji from "./Emoji";
import { useModal } from "contexts/ModalContext";
import { ComposerComp } from "@components/middleSectionComp";
import { TenorImage } from "gif-picker-react";

interface IProps {
  tenorGif: TenorImage | undefined;
  setTenorGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;

  messageMedia: {
    mediaFile: File;
    mediaURL: string;
  };
  setMessageMedia: React.Dispatch<
    React.SetStateAction<{
      mediaFile: File;
      mediaURL: string;
    }>
  >;
  setMessageContent: React.Dispatch<React.SetStateAction<string>>;
}

const ChatToolbar = ({
  tenorGif,
  setTenorGif,
  messageMedia,
  setMessageMedia,
  setMessageContent,
}: IProps) => {
  const { openModal, closeModal } = useModal();
  const isMediaDisabled: boolean = !!messageMedia.mediaURL;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const url = URL.createObjectURL(file);
    setMessageMedia({ mediaFile: file, mediaURL: url });
  };

  // const handleGif = () => {
  //   openModal(
  //     <ComposerComp.GIFMenu
  //       tenorGif={tenorGif}
  //       setTenorGif={setTenorGif}
  //       closeModal={closeModal}
  //     />
  //   );
  // };

  return (
    <div className="flex flex-row mr-1">
      <input
        id="chatMedia"
        type="file"
        accept="image/*,video/*,.gif"
        multiple={false}
        onChange={handleImageChange}
        hidden
      />

      <div>
        <label
          htmlFor="chatMedia"
          title="Image"
          className="flex min-w-[36px] min-h-[36px] items-center rounded-full hover:bg-primary-hover duration-200 cursor-pointer"
        >
          <div className="flex flex-grow justify-center items-center font-bold">
            <ImageIcon className="w-5 h-5 fill-primary-base" />
          </div>
        </label>
      </div>

      <button
        title="GIF"
        // onClick={handleGif}
        disabled={isMediaDisabled}
        className="flex min-w-[36px] min-h-[36px] items-center rounded-full hover:bg-primary-hover duration-200 disabled:cursor-not-allowed"
      >
        <div className="flex flex-grow justify-center items-center font-bold">
          <GIFIcon className="w-5 h-5 fill-primary-base" />
        </div>
      </button>

      <Emoji setMessageContent={setMessageContent} />
    </div>
  );
};

export default ChatToolbar;
