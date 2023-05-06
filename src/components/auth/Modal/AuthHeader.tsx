import { useNavigate } from "react-router-dom";
import { TwitterIcon, CancelIcon, LeftArrowIcon } from "@icons/Icon";

interface IProps {
  isRoute?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep?: number;
  handlePreviousStep?: () => void;
}

const AuthHeader = ({
  isRoute,
  setOpen,
  currentStep,
  handlePreviousStep,
}: IProps) => {

  const navigate = useNavigate();

  const onClose = () => {
    if (isRoute) {
      navigate("/");
    } else {
      setOpen?.(false);
    }
  };

  return (
    <>
      {(currentStep && currentStep >=2) ? (
        <div className="flex flex-row h-14 px-4 w-full justify-center items-center">
          <div className="flex w-16 items-center">
            <button
              onClick={handlePreviousStep}
              className="relative group hover:bg-gray-extraLight rounded-full p-2"
            >
              <LeftArrowIcon className={"w-5 h-5"} />
            </button>
          </div>
          <span className="flex grow text-xl font-bold">
              Step {currentStep}/6
            </span>
        </div>
      ) : !currentStep && (
        <div className="flex flex-row h-14 px-4 w-full justify-center items-center">
          <div className="flex-auto">
            <button
              onClick={onClose}
              className="relative group hover:bg-gray-extraLight rounded-full p-2"
            >
              <CancelIcon className={"w-5 h-5"} />
            </button>
          </div>
          <div className="flex-auto">
            <TwitterIcon className={"w-8 -ml-4 text-primary-base"} />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthHeader;
