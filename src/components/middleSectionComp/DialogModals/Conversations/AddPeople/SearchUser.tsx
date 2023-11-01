import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { SelectedIcon, VerifiedIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import classNames from "classnames";

interface IProps {
  user: IUser;
  reduxUser: UserState;
  addPeopleChat: IChat;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  selectedUsers: IUser[] | undefined;
  setSelectUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const SearchUser = ({
  user,
  reduxUser,
  addPeopleChat,
  setSearchText,
  selectedUsers,
  setSelectUsers,
}: IProps) => {
  const newSelectedUsers = [...(selectedUsers || [])];

  const isAddedUser = newSelectedUsers.some(
    (selectedUser) => selectedUser._id === user._id
  );

  const peopleChatMembers = addPeopleChat?.participants
    .filter((participant) => participant.user._id !== reduxUser.user?._id)
    .map((user) => user.user._id);

  const isMemberGroup = peopleChatMembers?.includes(user._id);

  const chatClassNames = classNames(
    "grid grid-cols-chat w-full items-start p-4 hover:bg-[color:var(--background-secondary)] duration-200 group",
    {
      "cursor-not-allowed opacity-50": isAddedUser || isMemberGroup,
    }
  );

  const handleSelect = () => {
    if (!isAddedUser && !isMemberGroup) {
      newSelectedUsers.push(user);
      setSelectUsers(newSelectedUsers);
      setSearchText("");
    }
  };

  return (
    <button key={user._id} onClick={handleSelect} className={chatClassNames}>
      <Avatar avatar={user.avatar!} />

      <div className="flex flex-col">
        <div className="grid grid-cols-content items-center gap-2">
          <div className="flex gap-2 truncate">
            <span className="font-bold truncate text-left">
              {user.displayName}
            </span>
            {user.isVerified && (
              <span className="font-bold text-left">
                <VerifiedIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
              </span>
            )}
          </div>
        </div>

        <p className="truncate text-left">@{user.username}</p>
      </div>

      {(isAddedUser || isMemberGroup) && (
        <div>
          <SelectedIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
        </div>
      )}
    </button>
  );
};

export default SearchUser;
