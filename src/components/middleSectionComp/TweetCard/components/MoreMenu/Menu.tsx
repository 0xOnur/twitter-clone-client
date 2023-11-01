import { UserState } from "@redux/slices/userSlice";
import FollowItem from "./FollowItem";
import DeleteItem from "./DeleteItem";
import ListsUser from "./ListsUser";
import CopyItem from "./CopyItem";

interface IProps {
  isAuthenticated?: boolean;
  reduxUser: UserState;
  tweet: ITweet;
  closeMenu: () => void;
}

const Menu = ({ reduxUser, tweet, isAuthenticated, closeMenu }: IProps) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-[color:var(--background-primary)] shadow-box">
      {isAuthenticated && reduxUser.user?._id !== tweet.author._id && (
        <FollowItem
          user={tweet.author}
          reduxUser={reduxUser}
          closeMenu={closeMenu}
        />
      )}

      {reduxUser.user?._id === tweet.author._id && (
        <DeleteItem tweet={tweet} closeMenu={closeMenu} />
      )}

      <CopyItem tweet={tweet} closeMenu={closeMenu} />

      <ListsUser tweet={tweet} />
    </div>
  );
};

export default Menu;
