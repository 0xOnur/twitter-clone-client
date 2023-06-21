import { IUser } from "@customTypes/UserTypes";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";
import FollowUnfollow from "./FollowsButton";
import EditProfile from "./EditProfile";
import More from "./More";
import Message from "./Message";

interface IProps {
  user: IUser;
}

const UserActions = ({ user }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);

  if (!reduxUser.isAuthenticated) {
    return null;
  }

  if (reduxUser.user._id === user._id) {
    return <EditProfile user={user} />;
  } else {
    return(
      <div className="flex flex-row gap-3 absolute right-0 top-0 py-3 px-4">
        <More user={user} />
        <Message />
        <FollowUnfollow user={user} reduxUser={reduxUser} />
      </div>
    );
  }
};

export default UserActions;