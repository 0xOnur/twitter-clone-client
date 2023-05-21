import { LoadingIcon } from "@icons/Icon";
import { IUser } from "@customTypes/UserTypes";
import CoverAndAvatar from "./CoverAndAvatar";
import UserActions from "./UserActions";
import UserInfo from "./UserInfo";
import NotFound from "./NotFound";
import Username from "./Username";

interface IProps {
  isLoading: boolean;
  user: IUser;
  username: string;
  error: any;
}

const UserCard = ({ isLoading, error, user, username }: IProps) => {
  if (isLoading) {
    return (
      <div className="flex w-full mt-20 items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (error) {
    return (
      <NotFound username={username} />
    );
  }

  if (user) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col">
          <CoverAndAvatar cover={user?.cover} avatar={user?.avatar} />
          <div className="flex flex-col pb-3 px-4 pt-[74px] relative">
            <UserActions user={user}/>
            <Username user={user} />
          </div>
        </div>
        <UserInfo user={user} />
      </div>
    );
  }

  return null;
};

export default UserCard;
