import { PeoplesIcon } from "@icons/Icon";

interface IProps {
  setGroupMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroup = ({ setGroupMode }: IProps) => {
  return (
    <div
      onClick={() => {
        setGroupMode(true);
      }}
      className="border-b-2 border-[color:var(--background-third)] bg-[color:var(--background-primary)] cursor-pointer hover:bg-[color:var(--background-secondary)] duration-200"
    >
      <div className="flex flex-row py-3 px-4 items-center">
        <div
          title="Create a group"
          className="mr-3 min-h-[32px] min-w-[32px] p-0.5 border-2 border-[color:var(--background-third)] rounded-full"
        >
          <div className="flex items-center justify-center p-2">
            <PeoplesIcon className="w-[18px] h-[18px] text-[color:var(--color-primary)]" />
          </div>
        </div>

        <div>
          <span className="font-bold text-[color:var(--color-primary)]">
            Create a group
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
