import { BackIcon } from "@icons/Icon";

interface IProps {
  isGroupChat: boolean;
}

const InfoHeader = ({ isGroupChat }: IProps) => {
  return (
    <div className="sticky top-0 z-10">
      <div className="h-[53px] bg-[color:var(--background-primary-alpha)] backdrop-blur-md">
        <div className="flex flex-row max-w-600px w-full h-full items-center mx-auto px-5">
          <div className="flex relative min-w-[56px] min-h-[32px] items-center">
            <button
              onClick={() => {
                window.history.back();
              }}
              title="Back"
              className="flex justify-center items-center min-w-[36px] min-h-[36px] hover:bg-[color:var(--background-third)] rounded-full duration-200"
            >
              <BackIcon className="w-5 h-5 antialiased" />
            </button>
          </div>

          <div className="flex flex-row h-full items-center w-full">
            <span className="font-bold text-xl leading-6 my-0.5">
              {isGroupChat ? "Group info" : " Conversation info"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoHeader;
