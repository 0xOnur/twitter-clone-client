import classNames from "classnames";
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";

interface IProps {
  url: string;
  name: string;
  notifCount?: number;
  Icon: React.ComponentType<{ isActive: boolean; className: string }>;
}

const SideLink: React.FC<IProps> = ({ url, name, Icon, notifCount }) => {
  const username = useSelector(
    (state: RootState) => state.user?.user?.username
  );

  const currentPath = useLocation().pathname;

  const location = useLocation();
  const isActive =
    location.pathname.includes(url) ||
    (name === "Profile" && location.pathname.includes(username));

  const nameClasses = classNames("ml-5 mr-4 text-xl hidden lg:inline-block", {
    "font-bold":
      isActive || (name === "Profile" && currentPath.includes(username)),
  });

  return (
    <a
      className="flex flex-col lg:items-start sm:items-center cursor-pointer grow-1 w-full py-1 group"
      href={url}
    >
      <div className="flex flex-row justify-center items-center max-w-full p-3 group-hover:bg-gray-extraLight duration-200 rounded-full">
        {name === "Notifications" ? (
          <div className="relative">
            <Icon className={"w-7 h-7 align-text-bottom"} isActive={isActive} />
            {notifCount! > 0 && (
              <div className="flex absolute -top-[6px] -right-1 min-w-[16px] h-4 box-content justify-center border border-white bg-primary-base rounded-full">
                <span className="text-[11px] leading-[14px] text-white">
                  {notifCount}
                </span>
              </div>
            )}
          </div>
        ) : (
          <Icon className={"w-7 h-7 align-text-bottom"} isActive={isActive} />
        )}
        <div className={nameClasses}>
          <span>{name}</span>
        </div>
      </div>
    </a>
  );
};

export default SideLink;
