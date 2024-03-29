import { CancelIcon } from "@icons/Icon";

interface IProps {
  closeModal: () => void;
}

const Header = ({ closeModal }: IProps) => {
  return (
    <div className="flex flex-row h-[53px] justify-between py-3 px-1 pr-3 bg-[color:var(--background-primary)]">
      <div className="flex flex-row items-center gap-3 mx-2">
        <button
          title="Close"
          type="button"
          onClick={closeModal}
          className="p-2 hover:bg-[color:var(--background-third)] rounded-full"
        >
          <CancelIcon className={"w-5 h-5"} />
        </button>
        <div>
          <span className="text-xl leading-6 font-bold">
            <h2>Send via Direct Message</h2>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
