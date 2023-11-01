import { CancelIcon } from "@icons/Icon";

interface IProps {
  closeModal: () => void;
  handleSave: () => void;
}

const Header = ({ closeModal, handleSave }: IProps) => {
  return (
    <div className="flex h-[53px] items-center p-3 bg-[color:var(--background-primary-alpha)] backdrop-blur-md">
      <div className="flex flex-row justify-between w-full items-center mx-2">
        <div className="flex flex-row gap-2 items-center">
          <button
            type="button"
            onClick={closeModal}
            className="p-2 hover:bg-[color:var(--background-third)] rounded-full"
          >
            <CancelIcon className={"w-5 h-5"} />
          </button>
          <span className="text-xl leading-6 font-bold">
            <h2>Edit profile</h2>
          </span>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="bg-[color:var(--color-base)] hover:opacity-80 py-1 px-4 rounded-full duration-200"
        >
          <span className="font-semibold text-[color:var(--background-primary)]">
            Save
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
