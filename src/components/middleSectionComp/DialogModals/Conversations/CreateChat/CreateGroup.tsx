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
      className="border-b bg-white cursor-pointer hover:bg-gray-rightbar duration-200"
    >
      <div className="flex flex-row py-3 px-4 items-center">
        <div
          title="Create a group"
          className="mr-3 min-h-[32px] min-w-[32px] p-0.5 border rounded-full hover:bg-primary-extraLight"
        >
          <div className="flex items-center justify-center p-2">
            <PeoplesIcon className="w-[18px] h-[18px] fill-primary-base" />
          </div>
        </div>

        <div>
          <span className="font-bold text-primary-base">Create a group</span>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
