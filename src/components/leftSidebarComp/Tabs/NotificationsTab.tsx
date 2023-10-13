import { NotificationsIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import classNames from "classnames";
import React from "react";

interface IProps {
  isActive: boolean;
  reduxUser: UserState;
}

const NotificationsTab = ({ reduxUser, isActive }: IProps) => {
  const tabClassNames = classNames("ml-5 mr-4 text-xl hidden lg:inline-block", {
    "font-bold": isActive,
  });

  const notificationClassNames = classNames(
    `
          flex
          absolute
          justify-center
          items-center
          -top-[6px]
          -right-1
          min-w-[16px]
          h-4
          box-content
          border
          border-white
          bg-primary-base
          rounded-full
        `,
    {
      "px-1":
        reduxUser?.notifications?.length &&
        reduxUser?.notifications?.length >= 10,
    }
  );

  return (
    <a
      href="/notifications"
      className="flex flex-col lg:items-start sm:items-center cursor-pointer grow-1 w-full py-1 group"
    >
      <div className="flex flex-row justify-center items-center max-w-full p-3 group-hover:bg-gray-extraLight duration-200 rounded-full">
        <div className="relative">
          <NotificationsIcon
            className={"w-7 h-7 align-text-bottom"}
            isActive={isActive}
          />
          {reduxUser?.notifications && (
            <div className={notificationClassNames}>
              <span className="text-xs leading-[14px] text-white">
                {reduxUser.notifications.length > 20
                  ? "20+"
                  : reduxUser.notifications.length}
              </span>
            </div>
          )}
        </div>

        <div className={tabClassNames}>
          <span>Notifications</span>
        </div>
      </div>
    </a>
  );
};

export default NotificationsTab;
