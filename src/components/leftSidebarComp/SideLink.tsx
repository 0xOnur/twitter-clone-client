import classNames from "classnames";
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";

interface IProps {
  name: string;
  Icon: ({
    isActive,
    className,
  }: {
    isActive: any;
    className: any;
  }) => JSX.Element;
}

const SideLink: React.FC<IProps> = ({ name, Icon }) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const username = reduxUser.user?.username!;

  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = currentPath.includes(name.toLowerCase());

  const navTextClasses = classNames(
    "ml-5 mr-4 text-xl hidden lg:inline-block",
    {
      "font-bold":
        isActive ||
        (name === "Profile" && currentPath.includes(username)),
    }
  );

  return (
    <a
      className="flex flex-col lg:items-start sm:items-center cursor-pointer grow-1 w-full py-1 group"
      href={`/${name === "Profile" ? username : name.toLowerCase()}`}
    >
      <div className="flex flex-row justify-center items-center max-w-full p-3 group-hover:bg-gray-extraLight duration-200 rounded-full">
        <Icon
          className={"w-7 h-7 align-text-bottom"}
          isActive={
            isActive ||
            (name === "Profile" && currentPath.includes(username))
          }
        />

        <div className={navTextClasses}>
          <span>{name}</span>
        </div>
      </div>
    </a>
  );
};

export default SideLink;
