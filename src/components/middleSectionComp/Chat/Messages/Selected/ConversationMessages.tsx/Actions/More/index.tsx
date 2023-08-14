import { TreeDotIcon } from "@icons/Icon";
import MoreMenu from "./MoreMenu";

interface IProps {
  isMine: boolean;
  message: IMessage;
  isOpenMore: boolean;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreButton = ({ isMine, message, isOpenMore, setOpenMore }: IProps) => {
  return (
    <div className="relative">
      <button
        title="More"
        onClick={() => {
          setOpenMore(true);
        }}
      >
        <div className="flex justify-center min-w-[36px] min-h-[36px] hover:bg-primary-extraLight duration-200 rounded-full">
          <div className="flex grow font-bold text-center items-center justify-center">
            <TreeDotIcon className="w-5 h-5 fill-gray-dark" />
          </div>
        </div>
      </button>

      {isOpenMore && (
        <MoreMenu isMine={isMine} message={message} setOpenMore={setOpenMore} />
      )}
    </div>
  );
};

export default MoreButton;
