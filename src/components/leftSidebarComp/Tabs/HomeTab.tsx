import { HomeIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  isActive: boolean;
}

const HomeTab = ({ isActive }: IProps) => {
  const tabClassNames = classNames("ml-5 mr-4 text-xl hidden lg:inline-block", {
    "font-bold": isActive,
  });

  return (
    <a
      href="/home"
      className="flex flex-col lg:items-start sm:items-center cursor-pointer grow-1 w-full py-1 group"
    >
      <div className="flex flex-row justify-center items-center max-w-full p-3 group-hover:bg-[color:var(--background-third)] duration-200 rounded-full">
        <HomeIcon className={"w-7 h-7 align-text-bottom"} isActive={isActive} />
        <div className={tabClassNames}>
          <span>Home</span>
        </div>
      </div>
    </a>
  );
};

export default HomeTab;
