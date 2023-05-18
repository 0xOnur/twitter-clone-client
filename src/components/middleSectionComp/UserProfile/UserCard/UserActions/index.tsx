import { IUser } from "@customTypes/UserTypes";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";
import FollowUnfollow from "./FollowUnfollow";
import EditProfile from "./EditProfile";

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
    return <FollowUnfollow user={user} reduxUser={reduxUser} />;
  }
};

export default UserActions;
