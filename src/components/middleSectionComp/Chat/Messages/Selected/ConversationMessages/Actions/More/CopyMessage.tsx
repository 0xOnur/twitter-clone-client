import { useCopyText } from "@hooks/useCopyText";
import { CopyMessageIcon } from "@icons/Icon";

interface IProps {
  message: IMessage;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const CopyMessage = ({ message, setOpenMore }: IProps) => {
  const { copyText } = useCopyText({
    text: message?.content! || message?.media?.url!,
    toastMessage: "Copied to clipboard",
  });

  return (
    <button
      onClick={
        () => {
            copyText();
            setOpenMore(false);
        }
      }
      className="flex flex-row items-center w-full py-3 px-4 hover:bg-[color:var(--background-secondary)] duration-200"
    >
      <div className="flex pr-3 justify-center">
        <CopyMessageIcon className="w-5 h-5" />
      </div>
      <div className="flex shrink grow w-full">
        <span className="font-bold">Copy message</span>
      </div>
    </button>
  );
};

export default CopyMessage;
