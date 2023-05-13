import { useNavigate } from "react-router-dom";
import { VerifiedIcon } from "@icons/Icon";
import { IUser } from "@customTypes/UserTypes";

interface IProps {
  user: IUser;
}

const UserList = ({ user }: IProps) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={()=> navigate(`/${user.username}`)}
      key={user._id}
      className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
    >
      <img src={user.avatar!} alt="avatar" className="w-11 h-11 rounded-full" />
      <div key={user._id} className="flex flex-col ml-3">
        <span className="flex flex-row items-center gap-1 font-bold text-md">
          {user.displayName?.length! > 25
            ? user.displayName?.slice(0, 20) + "..."
            : user.displayName}
          {user.isVerified && (
            <VerifiedIcon className="w-5 h-5 text-primary-base" />
          )}
        </span>
        <span className="flex text-sm text-gray-500">@{user.username}</span>
      </div>
    </button>
  );
};

export default UserList;
