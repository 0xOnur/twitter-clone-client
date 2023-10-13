import { ProfileIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import classNames from "classnames";

interface IProps {
  reduxUser: UserState;
  isActive: boolean;
}

const ProfileTab = ({ reduxUser, isActive }: IProps) => {
  const tabClassNames = classNames("ml-5 mr-4 text-xl hidden lg:inline-block", {
    "font-bold": isActive,
  });
  return (
    <a
      href={`/${reduxUser.user?.username}`}
      className="flex flex-col lg:items-start sm:items-center cursor-pointer grow-1 w-full py-1 group"
    >
      <div className="flex flex-row justify-center items-center max-w-full p-3 group-hover:bg-gray-extraLight duration-200 rounded-full">
        <ProfileIcon
          className={"w-7 h-7 align-text-bottom"}
          isActive={isActive}
        />
        <div className={tabClassNames}>
          <span>Profile</span>
        </div>
      </div>
    </a>
  );
};

export default ProfileTab;
