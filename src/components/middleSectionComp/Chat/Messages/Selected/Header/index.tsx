import { UserState } from "@redux/slices/userSlice";
import NormalHeader from "./NormalHeader";
import GroupHeader from "./GroupHeader";

interface IProps {
  reduxUser: UserState;
  chat: IChat;
}

const Header = ({ chat, reduxUser }: IProps) => {
  const isGroupChat = chat.isGroupChat;

  switch (isGroupChat) {
    case true:
      return <GroupHeader chat={chat} reduxUser={reduxUser} />;
    case false:
      return <NormalHeader chat={chat} reduxUser={reduxUser} />;
  }
};

export default Header;
