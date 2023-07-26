import { CancelIcon } from "@icons/Icon";
import NextButton from "./NextButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row h-[53px] justify-between py-3 px-1 pr-3 bg-white border-gray-200">
      <div className="flex flex-row items-center gap-3">
        <button
          title="Close"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
          className="p-3 hover:bg-gray-extraLight rounded-full"
        >
          <CancelIcon className={"w-5 h-5"} />
        </button>
        <div>
          <span className="text-xl leading-6 font-bold">New message</span>
        </div>
      </div>

      <NextButton />
    </div>
  );
};

export default Header;
